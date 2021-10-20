import { Logger } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { PlayerSeed } from '../seed/player.seed';

import type { MigrationInterface, QueryRunner } from 'typeorm';

import type { User } from '../auth/user.entity';

export class PlayerSeed1571907084199 implements MigrationInterface {
  private logger = new Logger('PlayerSeed');

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting Player seed...');

    try {
      let count = 0;

      for (const player of PlayerSeed) {
        const user = await getRepository<User>('User').findOneOrFail(undefined, {
          where: { id: player.user },
        });
        const players = await getRepository('Player').save({
          ...player,
          user,
        });

        if (players) {
          count++;
        }
      }

      if (count > 0) {
        this.logger.log(`Player seed completed successfully, ${count} rows added.`);
      }
    } catch (error) {
      this.logger.error('Player seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Starting Player seed reversion...');

    try {
      const players = await queryRunner.query(`DELETE FROM "player"`);
      const rowCount = players[1];

      if (players) {
        this.logger.log(`Player seed reversion completed successfully, ${rowCount} rows removed.`);
      }
    } catch (error) {
      this.logger.error('Player seed reversion failed', error.stack);
    }
  }
}
