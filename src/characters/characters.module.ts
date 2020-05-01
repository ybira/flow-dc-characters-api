import { CharacterService } from '@api/characters/character.service';
import { CharactersNoAuthController } from '@api/characters/characters-no-auth.controller';
import { CharactersController } from '@api/characters/characters.controller';
import { AddressRepository } from '@api/database/repositories/address.repository';
import { CharacterRepository } from '@api/database/repositories/character.repository';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5,
      max: 10,
    }),
    TypeOrmModule.forFeature([CharacterRepository, AddressRepository]),
  ],
  controllers: [CharactersController, CharactersNoAuthController],
  providers: [CharacterService],
})
export class CharactersModule {

}
