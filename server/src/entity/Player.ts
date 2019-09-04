import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Player {
  @PrimaryColumn('int')
  id: number;

  @Column({
    length: 25,
  })
  firstName: string;

  @Column({
    length: 25,
  })
  lastName: string;
  
  @Column('smallint')
  skillLevel: number;

  @Column('smallint')
  teamCaptain: number;

  @Column('int')
  teamId: number;
}