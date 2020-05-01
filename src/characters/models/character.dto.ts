import { AddressDto } from '@api/characters/models/address.dto';
import { Alignment } from '@api/database/entities/character.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CharacterDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  affiliation: string;

  @ApiProperty({
    enumName: 'Alignment',
    enum: Object.values(Alignment),
    example: Alignment.GOOD,
  })
  alignment: Alignment;

  @ApiProperty()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty()
  @Transform((value: string) => value.split(','))
  skills: string[];
}
