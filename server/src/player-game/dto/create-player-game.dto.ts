import { IsInt, IsNotEmpty } from 'class-validator';

import type { Game } from '../../game/game.entity';
import type { Player } from '../../player/player.entity';

export class CreatePlayerGameDto {
  @IsInt()
  @IsNotEmpty()
  public game: Game;

  @IsInt()
  @IsNotEmpty()
  public player: Player;
}
