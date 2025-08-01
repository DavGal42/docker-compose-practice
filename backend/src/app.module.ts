import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvValidation } from './config/env.validation';
import { mainConfig } from './config/main.config';
import { getDatabaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      validationSchema: getEnvValidation(),
      load: [mainConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseConfig,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
