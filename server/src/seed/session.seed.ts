import { SessionName } from '../session/session-name.enum';

import type { Session } from '../session/session.entity';

export const SessionSeed: Array<Partial<Session>> = [
  {
    name: SessionName.FALL,
    year: 2018,
  },
  {
    name: SessionName.SPRING,
    year: 2019,
  },
  {
    name: SessionName.SUMMER,
    year: 2019,
  },
  {
    name: SessionName.FALL,
    year: 2019,
  },
  {
    name: SessionName.SPRING,
    year: 2020,
  },
  {
    name: SessionName.SUMMER,
    year: 2020,
  },
  {
    name: SessionName.FALL,
    year: 2020,
  },
  {
    name: SessionName.SPRING,
    year: 2021,
  },
  {
    name: SessionName.SUMMER,
    year: 2021,
  },
  {
    name: SessionName.FALL,
    year: 2021,
  },
];
