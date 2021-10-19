import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

import { PlayerFormat } from '../../player/player-format.enum';

import type { Division } from '../../division/division.entity';
import type { HostLocation } from '../../host-location/host-location.entity';

export class UpdateTeamDto {
  @IsInt()
  @IsOptional()
  public division?: Division;

  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  @IsOptional()
  public format?: PlayerFormat;

  @IsInt()
  @IsOptional()
  public hostLocation?: HostLocation;

  @IsOptional()
  @IsString()
  public teamName?: string;

  @IsInt()
  @IsOptional()
  public teamNumber?: number;
}
