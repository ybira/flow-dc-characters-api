import { Alignment } from '@api/database/entities/character.entity';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CharactersGetAllQueryDto {
  @IsNumber()
  @Transform((value) => Number(value))
  @IsOptional()
  page: number;

  @IsNumber()
  @Transform((value) => Number(value))
  @IsOptional()
  pagePer: number;

  @IsEnum(Alignment)
  @IsOptional()
  alignment: Alignment;

  @IsString()
  @Transform((value => value.trim()))
  @IsOptional()
  text: string;
}
