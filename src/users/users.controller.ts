import { Auth } from '@api/auth/decorators/auth.decorator';
import { Role } from '@api/database/entities/user.entity';
import { PagedResponse } from '@api/shared/models/paged-response.model';
import { UsersRoute, UsersSwagger } from '@api/users/decorators/users-swagger.decorator';
import { CreateUserDto } from '@api/users/models/create-user.dto';
import { UsersGetAllQueryDto } from '@api/users/models/users-get-all-query.dto';
import { UserDto } from '@api/users/models/user.dto';
import { UsersService } from '@api/users/users.service';
import { Body, CacheInterceptor, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(Role.ADMIN)
  @UsersSwagger(UsersRoute.POST_USERS)
  public async create(@Body() user: CreateUserDto): Promise<UserDto> {
    return this.usersService.addUser(user);
  }

  @Get()
  @Auth(Role.ADMIN)
  @UseInterceptors(CacheInterceptor)
  @UsersSwagger(UsersRoute.GET_USERS)
  public async getAll(@Query() query: UsersGetAllQueryDto): Promise<PagedResponse<UserDto>> {
    return this.usersService.getUsers(query.page, query.pagePer, query.role, query.text);
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  @UsersSwagger(UsersRoute.GET_USER)
  @UseInterceptors(CacheInterceptor)
  public async getOne(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.getUser(id);
  }
}
