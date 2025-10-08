import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

export interface LogContext {
  gameId?: string;
  playerId?: string;
  userId?: string;
  event?: string;
  method?: string;
  path?: string;
  [key: string]: any;
}

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly context = 'Application';

  log(message: string, context?: string, logContext?: LogContext): void {
    this.formatLog('LOG', message, context, logContext);
  }

  error(message: string, trace?: string, context?: string, logContext?: LogContext): void {
    this.formatLog('ERROR', message, context, logContext, trace);
  }

  warn(message: string, context?: string, logContext?: LogContext): void {
    this.formatLog('WARN', message, context, logContext);
  }

  debug(message: string, context?: string, logContext?: LogContext): void {
    this.formatLog('DEBUG', message, context, logContext);
  }

  verbose(message: string, context?: string, logContext?: LogContext): void {
    this.formatLog('VERBOSE', message, context, logContext);
  }

  private formatLog(
    level: string,
    message: string,
    context?: string,
    logContext?: LogContext,
    trace?: string,
  ): void {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}]` : `[${this.context}]`;
    const levelStr = `[${level}]`;

    let logMessage = `${timestamp} ${levelStr} ${contextStr} ${message}`;

    if (logContext && Object.keys(logContext).length > 0) {
      logMessage += ` | Context: ${JSON.stringify(logContext)}`;
    }

    if (trace) {
      logMessage += `\nStack: ${trace}`;
    }

    // Utiliser console pour l'instant, peut être remplacé par un logger externe
    switch (level) {
      case 'ERROR':
        console.error(logMessage);
        break;
      case 'WARN':
        console.warn(logMessage);
        break;
      case 'DEBUG':
        console.debug(logMessage);
        break;
      default:
        console.log(logMessage);
    }
  }

  // Méthodes spécialisées pour les erreurs HTTP
  logHttpError(error: Error, path: string, method: string, statusCode: number): void {
    this.error(`HTTP Error ${statusCode}: ${error.message}`, error.stack, 'HTTP', {
      path,
      method,
      statusCode,
    });
  }

  // Méthodes spécialisées pour les erreurs WebSocket
  logWebSocketError(error: Error, event: string, gameId?: string, playerId?: string): void {
    this.error(`WebSocket Error: ${error.message}`, error.stack, 'WebSocket', {
      event,
      gameId,
      playerId,
    });
  }

  // Méthodes spécialisées pour les erreurs de base de données
  logDatabaseError(error: Error, operation: string, collection?: string): void {
    this.error(`Database Error during ${operation}: ${error.message}`, error.stack, 'Database', {
      operation,
      collection,
    });
  }
}
