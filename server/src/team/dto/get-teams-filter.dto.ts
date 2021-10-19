import { IsIn, IsNumberString, IsOptional } from 'class-validator';

import { PlayerFormat } from '../../player/player-format.enum';

import type { Division } from '../../division/division.entity';
import type { HostLocation } from '../../host-location/host-location.entity';

export class GetTeamsFilterDto {
  @IsNumberString()
  @IsOptional()
  public division?: Division;

  @IsIn([PlayerFormat.EIGHT, PlayerFormat.NINE])
  @IsOptional()
  public format?: PlayerFormat;

  @IsNumberString()
  @IsOptional()
  public hostLocation?: HostLocation;
}
