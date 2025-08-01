import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationHelpers } from './common/helpers';
process.env.TZ = 'Etc/UTC';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.setGlobalPrefix('api/v1');
  dotenv.config();

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        throw ValidationHelpers.constructValidationErrors(validationErrors);
      },
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
      whitelist: false,
      transform: true,
    }),
  );

  // if (process.env.NODE_ENV === 'development') {
  const config = new DocumentBuilder()
    .setTitle('APP APIs')
    .setDescription('The APP API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  // }
  await app.listen(port || 5000);
}

bootstrap();
