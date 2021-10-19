import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';

import type { UserInfo } from './auth.service';
import type { AuthCredentialsDto } from './dto/auth-credentials.dto';
import type { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  public constructor(private authService: AuthService) {}

  @Post('/signup')
  public signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  public signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<UserInfo> {
    return this.authService.signIn(authCredentialsDto);
  }
}
