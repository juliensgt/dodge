/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../routes/user/user.service';
import { BaseAuthGuard } from './base-auth.guard';

@Injectable()
export class AuthGuard extends BaseAuthGuard {
  constructor(userService: UserService) {
    super(userService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization as string;

    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    const supabaseUser = await this.validateToken(token);
    if (!supabaseUser) {
      throw new UnauthorizedException('Invalid token');
    }

    // Get user from database with role information
    const user = await this.getUserFromDatabase(supabaseUser);

    // Attach user to request
    request.user = user;
    return true;
  }
}
