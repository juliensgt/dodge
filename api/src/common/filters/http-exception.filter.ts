import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
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

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Extraire le message et le code d'erreur personnalisé
    let message: string;
    let errorCode: string | undefined;

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

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message,
      error: errorCode || this.getErrorName(status),
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    // Logger l'erreur
    this.loggerService.logHttpError(exception, request.url, request.method, status);

    // Envoyer la réponse
    response.status(status).json(errorResponse);
  }

  private getErrorName(status: number): string {
    switch (status) {
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 409:
        return 'Conflict';
      case 422:
        return 'Unprocessable Entity';
      case 429:
        return 'Too Many Requests';
      case 500:
        return 'Internal Server Error';
      default:
        return 'Unknown Error';
    }
  }
}
