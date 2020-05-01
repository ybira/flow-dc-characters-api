import { PagedResponse } from '@api/shared/models/paged-response.model';
import { CreateUserDto } from '@api/users/models/create-user.dto';
import { UserDto } from '@api/users/models/user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@api/database/repositories/user.repository';
import { Role, User } from '@api/database/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import * as Bcrypt from 'bcryptjs';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository,
              private readonly configService: ConfigService) {
  }

  public async addUser(user: CreateUserDto): Promise<UserDto> {
    user.password = await this.hashPassword(user.password);
    console.log(user);
    let newUser;
    try {
      newUser = await this.userRepository.save(user) as User;
    } catch (e) {
      throw new BadRequestException([e.code]);
    }
    return classToPlain(plainToClass(UserDto, newUser)) as UserDto;
  }

  private async hashPassword(value: string): Promise<string> {
    const salt = await Bcrypt.genSaltSync(this.configService.get<number>('auth.saltRounds'));
    return Bcrypt.hashSync(value, salt);
  }

  public async getUsers(page: number, pagePer: number, role: Role, text: string): Promise<PagedResponse<UserDto>> {
    const [all, data] = await this.userRepository.findPaginated(page, pagePer, role, text);
    return new PagedResponse<UserDto>(page, all, pagePer, classToPlain(plainToClass(UserDto, data)) as UserDto[]);
  }

  public async getUser(id: number): Promise<UserDto> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new BadRequestException(['Invalid id']);
    }
    return classToPlain(plainToClass(UserDto, user)) as UserDto
  }
}
