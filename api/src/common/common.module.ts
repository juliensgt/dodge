import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from '../routes/players/player.schema';
import { UserModule } from '../routes/user/user.module';
import { ActionPointsGuard } from './guards/action-points.guard';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoggerService } from './services/logger.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]), UserModule],
  providers: [ActionPointsGuard, AuthGuard, RoleGuard, LoggerService],
  exports: [ActionPointsGuard, AuthGuard, RoleGuard, LoggerService],
})
export class CommonModule {}
