import { CharacterDto } from '@api/characters/models/character.dto';
import { CreateCharacterDto } from '@api/characters/models/create-character.dto';
import { Alignment, Character } from '@api/database/entities/character.entity';
import { AddressRepository } from '@api/database/repositories/address.repository';
import { CharacterRepository } from '@api/database/repositories/character.repository';
import { PagedResponse } from '@api/shared/models/paged-response.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CharacterService {
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly addressRepository: AddressRepository,
  ) {}

  public async addCharacter(character: CreateCharacterDto): Promise<CharacterDto> {
    let newCharacter: Character;
    try {
      newCharacter = await this.characterRepository.save(character);
    } catch (e) {
      console.log(e);
      throw new BadRequestException([e.code]);
    }
    return plainToClass(CharacterDto, newCharacter);
  }

  public async getCharacters(alignment: Alignment, text: string): Promise<CharacterDto[]> {
    const characters = await this.characterRepository.findNotPaginated(alignment, text);
    return plainToClass(CharacterDto, characters);
  }

  public async getCharactersPaginated(
    page: number,
    pagePer: number,
    alignment: Alignment,
    text: string
  ): Promise<PagedResponse<CharacterDto>> {
    const [all, data] = await this.characterRepository.findPaginated(page, pagePer, alignment, text);
    return new PagedResponse<CharacterDto>(page, all, pagePer, plainToClass(CharacterDto, data));
  }

  public async getCharacter(id: number): Promise<CharacterDto> {
    const character = await this.characterRepository.findById(id);
    if (!character) {
      throw new BadRequestException(['Invalid id']);
    }
    return plainToClass(CharacterDto, character);
  }

  public async updateCharacter(id: number, character: CreateCharacterDto): Promise<CharacterDto> {
    let updated: Character;
    try {
      updated = await this.characterRepository.updateById(id, character);
    } catch (e) {
      throw new BadRequestException([e.code]);
    }
    return plainToClass(CharacterDto, updated);
  }

  public async deleteCharacter(id: number): Promise<CharacterDto> {
    const character = await this.characterRepository.findById(id);
    if (!character) {
      throw new BadRequestException(['Invalid id']);
    }

    try {
      await this.characterRepository.remove(character);
      await this.addressRepository.remove(character.address);
    } catch (e) {
      console.log(e);
      throw new BadRequestException([e.code]);
    }

    return plainToClass(CharacterDto, character);
  }
}
