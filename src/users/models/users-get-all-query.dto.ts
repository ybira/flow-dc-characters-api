import { Role } from '@api/database/entities/user.entity';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UsersGetAllQueryDto {
  @IsNumber()
  @Transform((value) => Number(value))
  @IsOptional()
  page: number;

  @IsNumber()
  @Transform((value) => Number(value))
  @IsOptional()
  pagePer: number;

  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @IsString()
  @Transform((value => value.trim()))
  @IsOptional()
  text: string;
}
