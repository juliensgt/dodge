/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ValidationService } from '../services/validation.service';
import { UserService } from '../../routes/user/user.service';
import { BaseAuthGuard } from '../../common/guards/base-auth.guard';

@Injectable()
export class WsAuthGuard extends BaseAuthGuard {
  constructor(
    userService: UserService,
    private readonly validationService: ValidationService,
  ) {
    super(userService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const authHeader = client.handshake?.headers?.authorization as string;

    if (!authHeader) throw new WsException('Missing auth token');

    const token = authHeader.split(' ')[1];
    const user = await this.validateToken(token);

    if (!user) throw new WsException('Unauthorized');

    const userId = user.id;
    const gameId = client.data.gameId as string;
    const playerId = client.data.playerId as string;

    //On valide l'utilisateur
    await this.validationService.validateUserId(userId);

    //On valide le jeu
    if (!gameId) {
      throw new WsException('Missing gameId');
    }
    await this.validationService.validateGameId(gameId);

    //On valide le joueur
    if (!playerId) {
      throw new WsException('Missing playerId');
    }

    await this.validationService.validateGameAndPlayer(gameId, playerId);

    // Get user from database with role information
    const dbUser = await this.getUserFromDatabase(user);

    // On attache l'utilisateur au client
    client.user = dbUser;
    return true;
  }
}
