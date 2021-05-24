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
import { SessionService } from './session.service';

import type { User } from '../auth/user.entity';
import type { CreateSessionDto } from './dto/create-session.dto';
import type { GetSessionsFilterDto } from './dto/get-sessions-filter.dto';
import type { UpdateSessionDto } from './dto/update-session.dto';
import type { Session } from './session.entity';

@Controller('api/session')
@UseGuards(CookieAuthenticationGuard)
export class SessionController {
  constructor(private sessionService: SessionService) {}

  private logger = new Logger('SessionController');

  @Post()
  @UsePipes(ValidationPipe)
  public createSession(
    @Body() createSessionDto: CreateSessionDto,
    @GetUser() user: User,
  ): Promise<Session> {
    this.logger.verbose(
      `User "${user.email}" creating a new session. Data: ${JSON.stringify(createSessionDto)}`,
    );
    return this.sessionService.createSession(createSessionDto);
  }

  @Delete('/:id')
  public deleteSession(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.email}" deleting a session. Session: ${id}`);
    return this.sessionService.deleteSession(id);
  }

  @Get('/:id')
  public getSessionById(@Param('id', ParseIntPipe) id: number): Promise<Session> {
    return this.sessionService.getSessionById(id);
  }

  @Get()
  public getSessions(
    @Query(ValidationPipe) filterDto: GetSessionsFilterDto,
    @GetUser() user: User,
  ): Promise<Session[]> {
    this.logger.verbose(
      `User "${user.email}" retrieving all sessions. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.sessionService.getSessions(filterDto);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  public updateSession(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSessionDto: UpdateSessionDto,
    @GetUser() user: User,
  ): Promise<Session> {
    return this.sessionService.updateSession(id, updateSessionDto);
  }
}
