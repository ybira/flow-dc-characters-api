import { Alignment } from '@api/database/entities/character.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CharactersGetAllNotPaginatedQueryDto {
  @IsEnum(Alignment)
  @IsOptional()
  alignment: Alignment;

  @IsString()
  @Transform((value) => value.trim())
  @IsOptional()
  text: string;
}
