import { GameWithId } from 'src/routes/game/game.schema';
import { UserWithId } from 'src/routes/user/user.schema';

export class PlayerCreateDto {
  game: GameWithId;
  user: UserWithId;
}
