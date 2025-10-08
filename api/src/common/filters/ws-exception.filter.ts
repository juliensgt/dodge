/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { LoggerService } from '../services/logger.service';
import { WsException } from '@nestjs/websockets';

export interface WebSocketErrorResponse {
  error: string;
  message: string;
  timestamp: string;
  event?: string;
  gameId?: string;
  playerId?: string;
}

interface WebSocketClientData {
  gameId?: string;
  playerId?: string;
}

interface WebSocketMessageData {
  event?: string;
}

@Catch(WsException)
export class WsExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(WsExceptionFilter.name);

  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: WsException, host: ArgumentsHost): void {
    const client = host.switchToWs().getClient<Socket>();
    const messageData = host.switchToWs().getData() as WebSocketMessageData;
    const event = messageData?.event ?? 'unknown';

    // Extraire le contexte depuis les données du client
    const clientData = client.data as WebSocketClientData;
    const gameId = clientData?.gameId;
    const playerId = clientData?.playerId;

    const errorResponse: WebSocketErrorResponse = {
      error: exception.name || 'WebSocketError',
      message: exception.message || 'An error occurred',
      timestamp: new Date().toISOString(),
      event,
      gameId,
      playerId,
    };

    // Logger l'erreur WebSocket
    this.loggerService.logWebSocketError(exception, event, gameId, playerId);

    // Émettre l'erreur au client
    client.emit('error', errorResponse);
  }
}

// Filter pour toutes les autres erreurs dans les WebSockets
@Catch()
export class WsAllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(WsAllExceptionsFilter.name);

  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const client = host.switchToWs().getClient<Socket>();
    const messageData = host.switchToWs().getData();
    const event = messageData?.event;

    // Extraire le contexte depuis les données du client
    const clientData = client.data as WebSocketClientData;
    const gameId = clientData?.gameId;
    const playerId = clientData?.playerId;

    // Convertir l'erreur en WsException si ce n'est pas déjà le cas
    const wsException = this.convertToWsException(exception);

    const errorResponse: WebSocketErrorResponse = {
      error: wsException.name || 'InternalError',
      message: wsException.message || 'An internal error occurred',
      timestamp: new Date().toISOString(),
      event,
      gameId,
      playerId,
    };

    // Logger l'erreur avec plus de détails
    this.loggerService.logWebSocketError(exception as Error, event as string, gameId, playerId);

    // Émettre l'erreur au client
    client.emit('error', errorResponse);
  }

  private convertToWsException(exception: unknown): WsException {
    if (exception instanceof WsException) {
      return exception;
    }

    if (exception instanceof Error) {
      return new WsException(exception.message);
    }

    if (typeof exception === 'string') {
      return new WsException(exception);
    }

    return new WsException('Internal server error');
  }
}
