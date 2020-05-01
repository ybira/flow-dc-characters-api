import { CreateCharacterDto } from '@api/characters/models/create-character.dto';
import { Alignment, Character } from '@api/database/entities/character.entity';
import { plainToClass } from 'class-transformer';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Character)
export class CharacterRepository extends Repository<Character> {
  public async findById(id: number): Promise<Character> {
    return this.findOne({ where: { id } });
  }

  public async findPaginated(
    page: number,
    pagePer: number,
    alignment: Alignment,
    text: string
  ): Promise<[number, Character[]]> {
    page = page ? page : 1;
    pagePer = pagePer ? pagePer : 5;

    const query = this.createQueryBuilder('character');
    query.leftJoinAndSelect('character.address', 'address');

    if (text) {
      query.orWhere('character.name LIKE :name', {
        name: `%${text}%`,
      });
      query.orWhere('character.affiliation LIKE :affiliation', {
        affiliation: `%${text}%`,
      });
      query.orWhere('character.skills LIKE :text', {
        text: `%${text}%`,
      });
      query.orWhere('address.planet LIKE :text', {
        text: `%${text}%`,
      });
      query.orWhere('address.city LIKE :text', {
        text: `%${text}%`,
      });
    }

    if (alignment) {
      query.andWhere('character.alignment=:alignment', {
        alignment,
      });
    }

    const all = await query.getCount();

    const data = await query
      .skip(pagePer * page - pagePer)
      .take(pagePer)
      .getMany();

    return [all, data];
  }

  public async findNotPaginated(
    alignment: Alignment,
    text: string
  ): Promise<Character[]> {

    const query = this.createQueryBuilder('character');
    query.leftJoinAndSelect('character.address', 'address');

    if (text) {
      query.orWhere('character.name LIKE :name', {
        name: `%${text}%`,
      });
      query.orWhere('character.affiliation LIKE :affiliation', {
        affiliation: `%${text}%`,
      });
      query.orWhere('character.skills LIKE :text', {
        text: `%${text}%`,
      });
      query.orWhere('address.planet LIKE :text', {
        text: `%${text}%`,
      });
      query.orWhere('address.city LIKE :text', {
        text: `%${text}%`,
      });
    }

    if (alignment) {
      query.andWhere('character.alignment=:alignment', {
        alignment,
      });
    }

    const data = await query
      .getMany();

    return data;
  }

  public async updateById(id: number, character: CreateCharacterDto) {
    const char = await this.findById(id);
    if (!char) {
      throw { code: 'Id not found' }
    }
    const transformed = plainToClass(Character, character)
    transformed.id = char.id;
    transformed.address.id = char.address.id;
    return await this.save(transformed, {})
  }
}
