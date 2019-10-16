import * as bcrypt from 'bcryptjs';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Player } from '../player/player.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public id: number;

  @Column({
    length: 25,
    name: 'first_name',
    nullable: false,
  })
  public firstName: string;

  @Column({
    length: 50,
    name: 'last_name',
    nullable: false,
  })
  public lastName: string;

  @Column({
    length: 50,
    nullable: false,
  })
  public email: string;

  @Column({
    length: 50,
    nullable: false,
  })
  public password: string;

  @Column({
    length: 50,
    nullable: false,
  })
  public salt: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
  })
  public createdAt: Date;

  @Column({
    default: null,
    name: 'updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  public updatedAt: Date;

  @OneToMany(type => Player, player => player.userId)
  public players: Player[];

  public async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}