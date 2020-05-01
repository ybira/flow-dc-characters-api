import { Role } from '@api/database/entities/user.entity';
import { ApiError } from '@api/shared/models/api-error.model';
import { PagedResponse } from '@api/shared/models/paged-response.model';
import { UserDto } from '@api/users/models/user.dto';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse, ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

export enum UsersRoute {
  POST_USERS = 'POST /users',
  GET_USERS = 'GET /users',
  GET_USER = 'GET /users/:id'
}

export function UsersSwagger(route: UsersRoute) {
  switch (route) {
    case UsersRoute.POST_USERS:
      return applyDecorators(
        ApiCreatedResponse({ description: 'User created', type: UserDto }),
        ApiBadRequestResponse({ description: 'Bad request', type: ApiError })
      );
    case UsersRoute.GET_USERS:
      return applyDecorators(
        ApiQuery({ name: 'page', type: Number }),
        ApiQuery({ name: 'pagePer', type: Number }),
        ApiQuery({ name: 'role', enum: Role }),
        ApiQuery({ name: 'text', type: String }),
        ApiOkResponse({ description: 'Users fetched', type: PagedResponse }),
        ApiBadRequestResponse({ description: 'Bad request', type: ApiError })
      );
    case UsersRoute.GET_USER:
      return applyDecorators(
        ApiParam({ name: 'id' }),
        ApiOkResponse({ description: 'User fetched', type: UserDto }),
        ApiBadRequestResponse({ description: 'Bad request', type: ApiError })
      );
  }
}
