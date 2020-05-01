import { Winston } from '@api/shared/winston';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@api/app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Winston));

  app.setGlobalPrefix('api/v1');

  app.use(helmet());

  app.enableCors();

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  const options = new DocumentBuilder()
    .setTitle('Heroes and Villains')
    .setDescription('Heroes and Villains API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/documentation', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    }),
  );

  await app.listen(port);
}
bootstrap();
