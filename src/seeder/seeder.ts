import { Character } from '@api/database/entities/character.entity';
import { User } from '@api/database/entities/user.entity';
import { characters } from '@api/seeder/seeds/characters.seed';
import { users } from '@api/seeder/seeds/user.seed';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Bcrypt from 'bcryptjs';
import { Connection } from 'typeorm';
import { Winston } from '../shared/winston';

@Injectable()
export class Seeder {
  constructor(
    private readonly winston: Winston,
    private readonly configService: ConfigService,
    private connection: Connection,
  ) {}

  async seedUsers() {
    const salt = await Bcrypt.genSaltSync(this.configService.get<number>('auth.saltRounds'));
    users.forEach((user) => {
      user.password = Bcrypt.hashSync(user.password, salt);
      return user;
    })

    try {
      return this.connection.getRepository(User).save(users);
    } catch (e) {
      this.winston.error(e, 'Seeder');
      return;
    } finally {
      this.winston.log('Users seeded', 'Seeder');
    }
  }

  async seedCharacters() {
    try {
      return this.connection.getRepository(Character).save(characters);
    } catch (e) {
      this.winston.error(e, 'Seeder');
      return;
    } finally {
      this.winston.log('Characters seeded', 'Seeder');
    }
  }
}
