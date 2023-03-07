import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { createLogger, transports, format } from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const instance = createLogger({
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.ms(),
          nestWinstonModuleUtilities.format.nestLike('Prueba API CRUD', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
      new transports.File({
        filename: 'error.log',
        level: 'error',
        format: format.combine(format.timestamp(), format.ms()),
      }),
      new transports.File({
        filename: 'logs.log',
        format: format.combine(format.timestamp(), format.ms()),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('CRUD API Technical Assesment ')
    .setDescription('Technical Assesment for the junior developer position')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
