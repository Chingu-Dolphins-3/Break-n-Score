import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

import { PlayerFormat } from '../player-format.enum';

import type { SkillLevel } from '../../skill-level/skill-level.entity';

export class UpdatePlayerSkillLevelDto {
  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  @IsNotEmpty()
  public format: PlayerFormat;

  @IsInt()
  @IsNotEmpty()
  public skillLevel: SkillLevel;
}
