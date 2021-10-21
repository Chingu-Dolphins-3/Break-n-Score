import { IsBoolean, IsInt, IsISO8601, IsMilitaryTime, IsNotEmpty } from 'class-validator';

import type { Session } from '../../session/session.entity';

export class CreateMatchDto {
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  matchDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  postSeason: boolean;

  @IsInt()
  @IsNotEmpty()
  session: Session;

  @IsMilitaryTime()
  @IsNotEmpty()
  startTime: Date;

  @IsInt()
  @IsNotEmpty()
  weekNumber: number;
}
