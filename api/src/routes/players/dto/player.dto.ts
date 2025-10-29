import { Player } from '../player.schema';
import { User } from '../../user/user.schema';
import { Collection } from '../../collections/collection.schema';

export class PlayerDto {
  id: string;
  name: string;
  points: number;
  currentTime: number;
  selectedCollection: {
    skin: string;
    theme: string;
  };
  ready: boolean;

  static fromPlayer(player: Player, user: User & { collection?: Collection }): PlayerDto {
    const dto = new PlayerDto();
    dto.id = player._id.toString();
    if (user) {
      dto.name = user.name;
      dto.selectedCollection = user?.collection?.selectedCollection || {
        skin: 'default',
        theme: 'purple',
      };
    }
    dto.points = player.points;
    dto.currentTime = 0;
    dto.ready = player.ready;
    return dto;
  }
}
