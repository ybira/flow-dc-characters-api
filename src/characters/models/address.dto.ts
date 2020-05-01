import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  @Exclude()
  id?: number;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  planet: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;
}
