import { Seeder } from '@api/seeder/seeder';
import { SeederModule } from '@api/seeder/seeder.module';
import { Winston } from '@api/shared/winston';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(SeederModule);
  app.useLogger(app.get(Winston));

  const logger = app.get(Winston);
  const seeder = app.get(Seeder);

  try {
    await seeder.seedUsers();
    await seeder.seedCharacters();
  } catch (e) {
    logger.error('Seed error', 'Seeder')
  }

  logger.log('Seed successful', 'Seeder');
  await app.close();
}
bootstrap();
