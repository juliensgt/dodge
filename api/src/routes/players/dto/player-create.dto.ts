import { Game } from 'src/routes/game/game.schema';
import { User } from 'src/routes/user/user.schema';

export class PlayerCreateDto {
  game: Game;
  user: User;
}
