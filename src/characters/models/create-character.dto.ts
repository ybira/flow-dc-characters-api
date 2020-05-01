import { AddressDto } from '@api/characters/models/address.dto';
import { Alignment } from '@api/database/entities/character.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateCharacterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  affiliation: string;

  @ApiProperty({
    enumName: 'Alignment',
    enum: Object.values(Alignment),
    example: Alignment.GOOD,
  })
  @IsEnum(Alignment)
  @IsNotEmpty()
  alignment: Alignment;

  @ApiProperty()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({ type: [String] })
  @IsString()
  @IsNotEmpty()
  @Transform((value: string[]) => value.toString())
  skills: string;
}
