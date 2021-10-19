import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';

import type { Merge } from 'ts-essentials';

import type { AuthCredentialsDto } from './dto/auth-credentials.dto';
import type { CreateUserDto } from './dto/create-user.dto';
import type { JwtPayload } from './jwt-payload.interface';
import type { UserNameAndEmail } from './user.repository';

export type UserInfo = Merge<UserNameAndEmail, { accessToken: string }>;

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  private logger = new Logger('AuthService');

  public async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.signUp(createUserDto);
  }

  public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<UserInfo> {
    const user = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email: user.email };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

    return {
      ...user,
      accessToken,
    };
  }
}
