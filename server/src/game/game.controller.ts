import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CookieAuthenticationGuard } from '../auth/cookie-authentication.guard';
import { GetUser } from '../auth/get-user.decorator';
import { GameService } from './game.service';

import type { User } from '../auth/user.entity';
import type { CreateGameDto } from './dto/create-game.dto';
import type { GetGamesFilterDto } from './dto/get-games-filter.dto';
import type { UpdateGameDto } from './dto/update-game.dto';
import type { Game } from './game.entity';

@Controller('api/game')
@UseGuards(CookieAuthenticationGuard)
export class GameController {
  constructor(private gameService: GameService) {}

  private logger = new Logger('GameController');

  @Post()
  @UsePipes(ValidationPipe)
  public createGame(@Body() createGameDto: CreateGameDto, @GetUser() user: User): Promise<Game> {
    this.logger.verbose(
      `User "${user.email}" creating a new game. Data: ${JSON.stringify(createGameDto)}`,
    );
    return this.gameService.createGame(createGameDto, user);
  }

  @Delete('/:id')
  public deleteGame(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting a game. Game: ${id}`);
    return this.gameService.deleteGame(id);
  }

  @Get('/:id')
  public getGameById(@Param('id', ParseIntPipe) id: number): Promise<Game> {
    return this.gameService.getGameById(id);
  }

  @Get()
  public getGames(
    @Query(ValidationPipe) filterDto: GetGamesFilterDto,
    @GetUser() user: User,
  ): Promise<Game[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all games. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.gameService.getGames(filterDto);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  public updateGame(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameDto: UpdateGameDto,
    @GetUser() user: User,
  ): Promise<Game> {
    return this.gameService.updateGame(id, updateGameDto);
  }
}
