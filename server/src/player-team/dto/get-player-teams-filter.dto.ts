import { IsNumberString, IsOptional } from 'class-validator';

import { IsBooleanString } from '../../lib/custom.validator';

import type { Player } from '../../player/player.entity';
import type { Team } from '../../team/team.entity';

export class GetPlayerTeamsFilterDto {
  @IsBooleanString()
  @IsOptional()
  public captain?: boolean;

  @IsBooleanString()
  @IsOptional()
  public coCaptain?: boolean;

  @IsNumberString()
  @IsOptional()
  public player?: Player;

  @IsNumberString()
  @IsOptional()
  public team?: Team;
}
