import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { PlayerFormat } from '../../player/player-format.enum';

import type { Division } from '../../division/division.entity';
import type { HostLocation } from '../../host-location/host-location.entity';

export class CreateTeamDto {
  @IsInt()
  @IsNotEmpty()
  public division: Division;

  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  @IsNotEmpty()
  public format: PlayerFormat;

  @IsInt()
  @IsNotEmpty()
  public hostLocation: HostLocation;

  @IsNotEmpty()
  @IsString()
  public teamName: string;

  @IsInt()
  @IsNotEmpty()
  public teamNumber: number;
}
