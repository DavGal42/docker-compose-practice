import { ConfigService } from '@nestjs/config';
import { type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppEnvironment } from '../common/constants';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const nodeEnv = configService.get('NODE_ENV');

  return {
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    logging: nodeEnv === AppEnvironment.LOCAL,
    port: configService.get('DB_PORT'),
    host: configService.get('DB_HOST'),
    migrationsTableName: 'TypeOrmMeta',
    autoLoadEntities: true,
    migrationsRun: false,
    synchronize: true,
    type: 'postgres',
  };
};
