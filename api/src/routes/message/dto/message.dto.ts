import { PlayerDto } from 'src/routes/players/dto/player.dto';
import { Message } from '../message.schema';

export class MessageDto {
  id: string;
  gameId: string;
  player: PlayerDto;
  message: string;
  date: Date;

  static fromMessage(message: Message): MessageDto {
    const dto = new MessageDto();
    dto.id = message._id.toString();
    dto.gameId = message.gameId;
    // Only set player if it exists and has a user (handle deleted players gracefully)
    if (message.player && message.player.user) {
      dto.player = PlayerDto.fromPlayer(message.player, message.player.user);
    } else {
      // Player has left the game, create a placeholder PlayerDto
      const placeholderPlayer = new PlayerDto();
      placeholderPlayer.id = 'deleted';
      placeholderPlayer.name = 'Unknown Player';
      placeholderPlayer.points = 0;
      placeholderPlayer.currentTime = 0;
      placeholderPlayer.collection = { skin: 'default', theme: 'purple' };
      dto.player = placeholderPlayer;
    }
    dto.message = message.message;
    dto.date = message.date;
    return dto;
  }
}
