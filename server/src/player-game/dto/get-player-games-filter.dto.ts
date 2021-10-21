import { IsNumberString, IsOptional } from 'class-validator';

import { IsBooleanString } from '../../lib/custom.validator';

import type { Game } from '../../game/game.entity';
import type { Player } from '../../player/player.entity';

export class GetPlayerGamesFilterDto {
  @IsNumberString()
  @IsOptional()
  public game?: Game;

  @IsNumberString()
  @IsOptional()
  public player?: Player;

  @IsBooleanString()
  @IsOptional()
  public skunk?: boolean;

  @IsBooleanString()
  @IsOptional()
  public won?: boolean;
}
