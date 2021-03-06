import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { PlayerFormat } from '../player/player-format.enum';
import { Team } from '../team/team.entity';
import { DayOfWeekName } from './day-of-week.enum';

@Entity()
@Unique('UQ_dayOfWeek_name', ['dayOfWeek', 'name'])
export class Division extends BaseEntity {
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
  })
  public createdAt: Date;

  @Column({
    default: DayOfWeekName.SUNDAY,
    enum: DayOfWeekName,
    name: 'day_of_week',
    nullable: false,
    type: 'enum',
  })
  public dayOfWeek: DayOfWeekName;

  @Column({
    default: PlayerFormat.NINE,
    enum: PlayerFormat,
    nullable: false,
    type: 'enum',
  })
  public format: PlayerFormat;

  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public id: number;

  @Column({
    length: 25,
    nullable: false,
  })
  public name: string;

  @OneToMany(type => Team, team => team.division, {
    cascade: ['insert', 'update', 'remove'],
  })
  public teams: Team[];

  @Column({
    default: null,
    name: 'updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  public updatedAt: Date;
}
