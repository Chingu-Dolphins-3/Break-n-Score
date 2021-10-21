import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Game } from './game.entity';

import type { User } from '../auth/user.entity';
import type { CreateGameDto } from './dto/create-game.dto';
import type { GetGamesFilterDto } from './dto/get-games-filter.dto';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  private logger = new Logger('GameRepository');

  public async createGame(createGameDto: CreateGameDto, user: User): Promise<Game> {
    const { match, postSeason, startTime } = createGameDto;

    const game = new Game();
    game.deadBalls = 0;
    game.innings = 0;
    game.match = match;
    game.postSeason = postSeason;
    game.startTime = startTime;

    try {
      await game.save();
    } catch (error) {
      this.logger.error(
        `Failed to create game for user "${user.email}". Data: ${JSON.stringify(createGameDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return game;
  }

  public async getGame(game: Game): Promise<Game | undefined> {
    try {
      return this.createQueryBuilder('game')
        .innerJoinAndSelect('game.match', 'match')
        .where('game.id = :id', { id: game })
        .getOne();
    } catch (error) {
      this.logger.error(`Failed to get game info. Arguments: ${JSON.stringify(game)}`, error.stack);
      throw new NotFoundException();
    }
  }

  public async getGames(getGamesDto: GetGamesFilterDto): Promise<Game[]> {
    const { match, postSeason } = getGamesDto;
    const query = this.createQueryBuilder('game');

    if (match) {
      query.where('game.match = :match', { match });
    } else if (postSeason) {
      query.where('game.postSeason = :postSeason', { postSeason });
    }

    try {
      return query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get game info. Arguments: ${JSON.stringify(getGamesDto)}`,
        error.stack,
      );
      throw new NotFoundException();
    }
  }
}
