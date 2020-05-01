import { Address } from '@api/database/entities/address.entity';
import { Character } from '@api/database/entities/character.entity';
import { User } from '@api/database/entities/user.entity';
import { Seeder } from '@api/seeder/seeder';
import { Winston } from '@api/shared/winston';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [User, Address, Character],
        synchronize: true,
      }),
    }),
  ],
  providers: [
    Winston,
    Seeder,
    ConfigService
  ],
})
export class SeederModule {}
