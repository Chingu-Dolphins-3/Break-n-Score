import { Logger } from '@nestjs/common';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { SkillLevelSeed } from '../seed/skill-level.seed';

export class SkillLevelSeed1571907084193 implements MigrationInterface {
  private logger = new Logger('SkillLevelSeed');

  public async up(queryRunner: QueryRunner): Promise<any> {
    this.logger.log('Starting SkillLevel seed...');

    try {
      const skillLevels = await getRepository('SkillLevel').save(SkillLevelSeed);
      if (skillLevels) {
        this.logger.log('SkillLevel seed completely successfully');
      }
    } catch (error) {
      this.logger.error('SkillLevel seed failed', error.stack);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // insert SQL statement to revert the changes made by `up` method.
  }
}
