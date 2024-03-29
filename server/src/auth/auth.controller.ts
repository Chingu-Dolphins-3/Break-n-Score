import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CookieAuthenticationGuard } from './cookie-authentication.guard';

import type { Request, Response } from 'express';

import type { AuthCredentialsDto } from './dto/auth-credentials.dto';
import type { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  public constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('/signin')
  public async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const user = await this.authService.signIn(authCredentialsDto);
    const { email } = user;
    const cookie = await this.authService.getCookieWithJwtToken({ email });
    response.setHeader('Set-Cookie', cookie);

    return response.send(user);
  }

  @Post('/signout')
  @UseGuards(CookieAuthenticationGuard)
  public async signOut(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const cookie = this.authService.getCookieForSignOut();
    response.setHeader('Set-Cookie', cookie);

    return response.sendStatus(200);
  }

  @Post('/signup')
  public async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }
}
