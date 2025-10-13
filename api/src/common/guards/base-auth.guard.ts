/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { SupabaseClient, createClient, User } from '@supabase/supabase-js';
import { UserService } from '../../routes/user/user.service';

@Injectable()
export abstract class BaseAuthGuard implements CanActivate {
  protected supabase: SupabaseClient;

  constructor(protected readonly userService: UserService) {
    this.supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  }

  abstract canActivate(context: ExecutionContext): Promise<boolean>;

  protected async validateToken(token: string): Promise<User | null> {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser(token);

    if (error || !user) {
      return null;
    }

    return user;
  }

  protected async getUserFromDatabase(supabaseUser: User) {
    return await this.userService.findOrCreate(supabaseUser.id, {
      name: supabaseUser.user_metadata?.name || supabaseUser.email || 'Guest',
      email: supabaseUser.email,
      userMetadata: supabaseUser.user_metadata as Record<string, any>,
      appMetadata: supabaseUser.app_metadata as Record<string, any>,
    });
  }
}
