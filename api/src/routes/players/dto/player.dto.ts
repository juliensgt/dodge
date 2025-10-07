import { Player } from '../player.schema';
import { User } from '../../user/user.schema';

export class PlayerDto {
  id: string;
  name: string;
  points: number;
  currentTime: number;
  skinCards: string;
  ready: boolean;

  static fromPlayer(player: Player, user: User): PlayerDto {
    const dto = new PlayerDto();
    dto.id = player._id.toString();
    if (user) {
      dto.name = user.name;
      dto.skinCards = user.skinCards;
    }
    dto.points = player.points;
    dto.currentTime = 0;
    dto.ready = player.ready;
    return dto;
  }
}
