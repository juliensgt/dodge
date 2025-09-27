import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from '../routes/game/game.service';
import { MessageService } from '../routes/message/message.service';
import { PlayerWithId } from '../routes/players/player.schema';
import { TurnHandler } from './handlers/turn.handler';
import { CardHandler } from './handlers/card.handler';
import { InterventionHandler } from './handlers/intervention.handler';
import { BroadcastService } from './services/broadcast.service';
import { GameEvents } from './events/game.events';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly gameService: GameService,
    private readonly messageService: MessageService,
    private readonly turnHandler: TurnHandler,
    private readonly cardHandler: CardHandler,
    private readonly interventionHandler: InterventionHandler,
    private readonly broadcastService: BroadcastService,
  ) {}

  afterInit(server: Server) {
    this.broadcastService.setServer(server);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinGame')
  async handleJoinGame(
    @MessageBody() data: { gameId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const player = await this.gameService.addPlayer({
      gameId: data.gameId,
      userId: data.userId,
      sessionId: client.id,
    });
    await client.join(data.gameId);

    // Notify all players in the game
    this.broadcastService.broadcastToGame(data.gameId, GameEvents.PLAYER_JOINED, {
      playerId: (player as PlayerWithId)._id,
      userId: data.userId,
    });

    return { success: true, playerId: (player as PlayerWithId)._id };
  }

  @SubscribeMessage('leaveGame')
  async handleLeaveGame(
    @MessageBody() data: { gameId: string; playerId: string },
    @ConnectedSocket() client: Socket,
  ) {
    await client.leave(data.gameId);

    // Notify all players in the game
    this.broadcastService.broadcastToGame(data.gameId, GameEvents.PLAYER_LEFT, {
      playerId: data.playerId,
    });

    return { success: true };
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { gameId: string; playerId: string; message: string },
  ) {
    const message = await this.messageService.create({
      gameId: data.gameId,
      playerId: data.playerId,
      message: data.message,
    });

    // Broadcast message to all players in the game
    this.server.to(data.gameId).emit('newMessage', message);

    return { success: true, message };
  }

  // ===== TURN EVENTS =====
  // WORKFLOW ÉTAPE 2: GET_CARD_IN_DECK_OR_DEFAUSSE
  /*@SubscribeMessage('getCardInDeckOrDefausse')
  async handleGetCardInDeckOrDefausse(
    @MessageBody()
    data: {
      gameId: string;
      playerId: string;
      choice: 'deck' | 'defausse';
    },
  ) {
    return this.turnHandler.handleGetCardInDeckOrDefausse(
      data.gameId,
      data.playerId,
      data.choice,
    );
  }*/

  // WORKFLOW ÉTAPE 3A: SWITCH_WITH_DECK
  /*@SubscribeMessage('switchWithDeck')
  async handleSwitchWithDeck(
    @MessageBody()
    data: {
      gameId: string;
      playerId: string;
      action: 'deckToDefausse' | 'deckToPlayer';
      targetCardId?: string;
    },
  ) {
    return this.turnHandler.handleSwitchWithDeck(
      data.gameId,
      data.playerId,
      data.action,
      data.targetCardId,
    );
  }*/

  // WORKFLOW ÉTAPE 3B: SWITCH_WITH_DEFAUSSE
  /*@SubscribeMessage('switchWithDefausse')
  async handleSwitchWithDefausse(
    @MessageBody()
    data: {
      gameId: string;
      playerId: string;
      targetCardId: string;
    },
  ) {
    return this.turnHandler.handleSwitchWithDefausse(
      data.gameId,
      data.playerId,
      data.targetCardId,
    );
  }*/

  // WORKFLOW ÉTAPE 7: FIN DU TOUR
  /*@SubscribeMessage('endTurn')
  async handleEndTurn(
    @MessageBody() data: { gameId: string; playerId: string },
  ) {
    return this.turnHandler.handleEndTurn(data.gameId, data.playerId);
  }*/

  // ===== CARD EVENTS =====
  // Actions sur les cartes (peuvent être utilisées pendant les interventions)
  /*@SubscribeMessage('playCard')
  async handlePlayCard(
    @MessageBody() data: { gameId: string; playerId: string; cardId: string },
  ) {
    return this.cardHandler.handlePlayCard(
      data.gameId,
      data.playerId,
      data.cardId,
    );
  }*/

  // Action de défense (esquive)
  /*@SubscribeMessage('dodge')
  async handleDodge(@MessageBody() data: { gameId: string; playerId: string }) {
    return this.cardHandler.handleDodge(data.gameId, data.playerId);
  }*/

  // ===== INTERVENTION EVENTS =====
  // WORKFLOW ÉTAPE 5: OUVERTURE DES INTERVENTIONS
  // Les autres joueurs peuvent intervenir pendant la phase d'interventions
  /*@SubscribeMessage('intervention')
  async handleIntervention(
    @MessageBody()
    data: {
      gameId: string;
      playerId: string;
      targetPlayerId: string;
      interventionType: string;
      cardId: string;
    },
  ) {
    return this.interventionHandler.handleIntervention(
      data.gameId,
      data.playerId,
      data.targetPlayerId,
      data.interventionType,
      data.cardId,
    );
  }

  @SubscribeMessage('interventionResponse')
  async handleInterventionResponse(
    @MessageBody()
    data: {
      gameId: string;
      playerId: string;
      interventionId: string;
      response: 'accept' | 'decline';
    },
  ) {
    return this.interventionHandler.handleInterventionResponse(
      data.gameId,
      data.playerId,
      data.interventionId,
      data.response,
    );
  }*/
}
