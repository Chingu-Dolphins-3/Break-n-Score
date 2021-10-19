import { IsNumberString, IsOptional } from 'class-validator';

import { IsBooleanString } from '../../lib/custom.validator';

import type { Match } from '../../match/match.entity';
import type { Team } from '../../team/team.entity';

export class GetTeamMatchesFilterDto {
  @IsBooleanString()
  @IsOptional()
  public homeTeam?: boolean;

  @IsNumberString()
  @IsOptional()
  public match?: Match;

  @IsNumberString()
  @IsOptional()
  public team?: Team;

  @IsBooleanString()
  @IsOptional()
  public won?: boolean;
}
