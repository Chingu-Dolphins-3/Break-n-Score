import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';

import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';

const cookieParser = require('cookie-parser');

const configService = new ConfigService();
const appConfigService = new AppConfigService(configService);

async function bootstrap(): Promise<void> {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors();
    // TODO: Un-comment the lines below once deployed to live server
    // app.enableCors({ origin: appConfig.serverOrigin });
    // logger.log(`Accepting requests from origin "${appConfig.serverOrigin}"`);
  }

  await app.listen(appConfigService.serverPort);
  logger.log(`Application listening on port ${appConfigService.serverPort}`);
}

bootstrap();
