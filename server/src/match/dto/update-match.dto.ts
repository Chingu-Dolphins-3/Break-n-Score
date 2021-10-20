import { IsBoolean, IsInt, IsISO8601, IsMilitaryTime, IsOptional } from 'class-validator';

import type { Session } from '../../session/session.entity';

export class UpdateMatchDto {
  @IsMilitaryTime()
  @IsOptional()
  endTime?: Date;

  @IsISO8601({ strict: true })
  @IsOptional()
  matchDate?: Date;

  @IsBoolean()
  @IsOptional()
  postSeason?: boolean;

  @IsInt()
  @IsOptional()
  session?: Session;

  @IsMilitaryTime()
  @IsOptional()
  startTime?: Date;

  @IsInt()
  @IsOptional()
  weekNumber?: number;
}
