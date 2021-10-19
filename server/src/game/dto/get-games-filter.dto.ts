import { IsNumberString, IsOptional } from 'class-validator';

import { IsBooleanString } from '../../lib/custom.validator';

import type { Match } from '../../match/match.entity';

export class GetGamesFilterDto {
  @IsNumberString()
  @IsOptional()
  match?: Match;

  @IsBooleanString()
  @IsOptional()
  postSeason?: boolean;
}
