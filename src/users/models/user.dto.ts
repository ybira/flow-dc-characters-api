import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@api/database/entities/user.entity';
import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty()
  id: number;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({
    enumName: 'Role',
    enum: Object.values(Role),
    example: Role.ADMIN
  })
  role: Role;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({name: 'fullName', type: String})
  @Expose({name: 'fullName'})
  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}


