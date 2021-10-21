import type { StrictOmit } from 'ts-essentials';

import type { PlayerTeam } from '../player-team/player-team.entity';

export type PlayerTeamSeedEntity = StrictOmit<PlayerTeam, 'player' | 'team'> & {
  player: number;
  team: number;
};

export const PlayerTeamSeed: Array<Partial<PlayerTeamSeedEntity>> = [
  {
    captain: false,
    coCaptain: true,
    player: 1,
    team: 7,
  },
  {
    captain: false,
    coCaptain: true,
    player: 2,
    team: 8,
  },
  {
    captain: true,
    coCaptain: false,
    player: 2,
    team: 9,
  },
  {
    captain: false,
    coCaptain: true,
    player: 3,
    team: 1,
  },
  {
    captain: false,
    coCaptain: true,
    player: 4,
    team: 2,
  },
  {
    captain: false,
    coCaptain: true,
    player: 4,
    team: 3,
  },
  {
    captain: true,
    coCaptain: false,
    player: 5,
    team: 4,
  },
  {
    captain: true,
    coCaptain: false,
    player: 6,
    team: 5,
  },
  {
    captain: false,
    coCaptain: true,
    player: 6,
    team: 6,
  },
  {
    captain: true,
    coCaptain: false,
    player: 7,
    team: 7,
  },
  {
    captain: true,
    coCaptain: false,
    player: 8,
    team: 8,
  },
  {
    captain: false,
    coCaptain: true,
    player: 8,
    team: 9,
  },
  {
    captain: true,
    coCaptain: false,
    player: 9,
    team: 1,
  },
  {
    captain: true,
    coCaptain: false,
    player: 10,
    team: 2,
  },
  {
    captain: true,
    coCaptain: false,
    player: 10,
    team: 3,
  },
  {
    captain: false,
    coCaptain: true,
    player: 11,
    team: 4,
  },
  {
    captain: false,
    coCaptain: true,
    player: 12,
    team: 5,
  },
  {
    captain: true,
    coCaptain: false,
    player: 12,
    team: 6,
  },
];
