import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

import type { Player } from '../../player/player.entity';
import type { Team } from '../../team/team.entity';

export class CreatePlayerTeamDto {
  @IsBoolean()
  @IsNotEmpty()
  public captain: boolean;

  @IsBoolean()
  @IsNotEmpty()
  public coCaptain: boolean;

  @IsInt()
  @IsNotEmpty()
  public player: Player;

  @IsInt()
  @IsNotEmpty()
  public team: Team;
}
