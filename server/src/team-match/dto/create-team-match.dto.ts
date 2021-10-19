import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

import type { Match } from '../../match/match.entity';
import type { Team } from '../../team/team.entity';

export class CreateTeamMatchDto {
  @IsBoolean()
  @IsNotEmpty()
  public homeTeam: boolean;

  @IsInt()
  @IsNotEmpty()
  public match: Match;

  @IsInt()
  @IsNotEmpty()
  public team: Team;
}
