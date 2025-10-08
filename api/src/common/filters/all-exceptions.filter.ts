import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../services/logger.service';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  method: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode = 'INTERNAL_ERROR';

    // Si c'est déjà une HttpException, la laisser passer
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message =
          (responseObj.message as string) || (responseObj.error as string) || exception.message;
        errorCode = (responseObj.errorCode as string) || (responseObj.error as string);
      } else {
        message = exception.message;
      }
    } else {
      // Gérer les erreurs non-HTTP
      const errorName = (exception as Error).name;
      if (errorName === 'ValidationError') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Validation failed';
        errorCode = 'VALIDATION_ERROR';
      } else if (errorName === 'CastError') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid ID format';
        errorCode = 'INVALID_ID';
      } else if (errorName === 'MongoError' || errorName === 'MongooseError') {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Database error';
        errorCode = 'DATABASE_ERROR';

        // Logger spécifiquement les erreurs de base de données
        this.loggerService.logDatabaseError(
          exception as Error,
          request.method,
          this.extractCollectionFromPath(request.url),
        );
      } else {
        // Erreur inconnue
        const errorMessage = (exception as Error).message;
        message = errorMessage || 'An unexpected error occurred';
        errorCode = 'UNKNOWN_ERROR';
      }
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message,
      error: errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    // Logger l'erreur
    this.loggerService.error(
      `Unhandled exception: ${message}`,
      (exception as Error).stack,
      'AllExceptionsFilter',
      {
        path: request.url,
        method: request.method,
        statusCode: status,
        errorName: (exception as Error).name,
      },
    );

    // Envoyer la réponse
    response.status(status).json(errorResponse);
  }

  private extractCollectionFromPath(path: string): string | undefined {
    // Extraire le nom de la collection depuis l'URL
    // Ex: /api/games -> games, /api/users -> users
    const pathSegments = path.split('/').filter((segment) => segment && segment !== 'api');
    return pathSegments[0];
  }
}
