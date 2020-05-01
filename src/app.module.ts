import { Address } from '@api/database/entities/address.entity';
import { Character } from '@api/database/entities/character.entity';
import { Winston } from '@api/shared/winston';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@api/auth/auth.module';
import { User } from '@api/database/entities/user.entity';
import { CharactersModule } from '@api/characters/characters.module';
import { UsersModule } from '@api/users/users.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CharactersModule,
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
  providers: [Winston]
})
export class AppModule {}
