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
    if (message.player && message.player.user) {
      dto.player = PlayerDto.fromPlayer(message.player, message.player.user);
    }
    dto.message = message.message;
    dto.date = message.date;
    return dto;
  }
}
