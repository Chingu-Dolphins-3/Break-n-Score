import { DotenvParseOutput, parse } from 'dotenv';
import * as Fs from 'fs';
import * as Path from 'path';
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions';

interface EnvObject {
  POSTGRES_USER: string;
  POSTGRES_PASS: string;
}

export interface OrmConfiguration extends BaseConnectionOptions {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities: string[];
  migrations: string[];
  subscribers: string[];
  cli: {
    entitiesDir: string;
    migrationsDir: string;
    subscribersDir: string;
  };
}

export class OrmConfig {
  private readonly configuration: OrmConfiguration;

  public constructor() {
    this.configuration = OrmConfig.setConfig();
  }

  public getConfig(): OrmConfiguration {
    if (this.configuration) {
      return this.configuration;
    }

    return OrmConfig.setConfig();
  }

  private static getDesiredEnvVars(envArgs: DotenvParseOutput): EnvObject {
    const defaultEnvVars: EnvObject = {
      POSTGRES_USER: '',
      POSTGRES_PASS: '',
    };

    for (const key in defaultEnvVars) {
      if (envArgs.hasOwnProperty(key)) {
        defaultEnvVars[key] = envArgs[key];
      }
    }

    return defaultEnvVars;
  }

  public static setConfig(): OrmConfiguration {
    // TODO: install and use `dotenv-webpack` once CRA ejected to fix `server:start:prod` script
    const typeOrmDir = process.env.NODE_ENV === 'production' ? 'server/dist' : 'server/src';
    const fileExt = process.env.NODE_ENV === 'production' ? 'js' : 'ts';
    const dotEnvFilePath = Path.resolve(__dirname, '../../.env');
    let dotEnv: Buffer | string = '';

    if (Fs.existsSync(dotEnvFilePath)) {
      dotEnv = Fs.readFileSync(dotEnvFilePath, { encoding: 'utf8' });
    }

    const envVariables: DotenvParseOutput = parse(dotEnv);
    const dbVariables: EnvObject = OrmConfig.getDesiredEnvVars(envVariables);

    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: dbVariables.POSTGRES_USER,
      password: dbVariables.POSTGRES_PASS,
      database: 'break_n_score',
      synchronize: true,
      logging: false,
      entities: [`${typeOrmDir}/entity/*.${fileExt}`],
      migrations: [`${typeOrmDir}/migration/*.${fileExt}`],
      subscribers: [`${typeOrmDir}/subscriber/*.${fileExt}`],
      cli: {
        entitiesDir: `${typeOrmDir}/entity`,
        migrationsDir: `${typeOrmDir}/migration`,
        subscribersDir: `${typeOrmDir}/subscriber`,
      },
    };
  }
}
