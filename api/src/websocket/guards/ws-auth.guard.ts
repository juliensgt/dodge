/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { WsException } from '@nestjs/websockets';
import { ValidationService } from '../services/validation.service';

@Injectable()
export class WsAuthGuard implements CanActivate {
  private supabase: SupabaseClient;
  constructor(private readonly validationService: ValidationService) {
    this.supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const authHeader = client.handshake?.headers?.authorization;

    if (!authHeader) throw new WsException('Missing auth token');

    const token = authHeader.split(' ')[1];
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser(token);

    if (error || !user) throw new WsException('Unauthorized');

    const userId = user.id;
    const gameId = client.data.gameId as string;
    const playerId = client.data.playerId as string;

    //On valide l'utilisateur
    await this.validationService.validateUserId(userId).catch((error) => {
      console.log('error', error);
      throw new WsException('Invalid user');
    });

    //On valide le jeu
    if (!gameId) {
      throw new WsException('Missing gameId');
    }
    await this.validationService.validateGameId(gameId).catch((error) => {
      console.log('error', error);
      throw new WsException('Invalid game');
    });

    //On valide le joueur
    if (!playerId) {
      throw new WsException('Missing playerId');
    }

    await this.validationService.validateGameAndPlayer(gameId, playerId).catch((error) => {
      console.log('error', error);
      throw new WsException('Invalid game or player');
    });

    // On attache l'utilisateur au client
    client.user = user;
    return true;
  }
}
