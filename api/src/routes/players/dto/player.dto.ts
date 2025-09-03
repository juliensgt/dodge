import { Player } from '../player.schema';
import { User } from '../../user/user.schema';

export class PlayerDto {
  id: string;
  name: string;
  points: number;
  currentTime: number;
  skinCards: string;

  static fromPlayer(player: Player & { _id: string }, user: User): PlayerDto {
    const dto = new PlayerDto();
    dto.id = player._id;
    dto.name = user.name;
    dto.points = player.points;
    dto.currentTime = 0;
    dto.skinCards = user.skinCards;
    return dto;
  }
}
