import { IsBoolean, IsInt, IsMilitaryTime, IsNotEmpty } from 'class-validator';

import type { Match } from '../../match/match.entity';

export class CreateGameDto {
  @IsInt()
  @IsNotEmpty()
  match: Match;

  @IsBoolean()
  @IsNotEmpty()
  postSeason: boolean;

  @IsMilitaryTime()
  @IsNotEmpty()
  startTime: Date;
}
