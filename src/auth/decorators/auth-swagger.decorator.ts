import { AuthCredentials } from '@api/auth/models/auth-credentials.model';
import { Refresh } from '@api/auth/models/refresh.model';
import { Token } from '@api/auth/models/token.model';
import { ApiError } from '@api/shared/models/api-error.model';
import { UserDto } from '@api/users/models/user.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

export enum AuthRoute {
  LOGIN = 'login',
  REFRESH = 'refresh',
  USER = 'user',
}

export function AuthSwagger(route: AuthRoute) {
  switch (route) {
    case AuthRoute.LOGIN:
      return applyDecorators(
        ApiBody({ type: AuthCredentials }),
        ApiOkResponse({ description: 'Successful Login', type: Token }),
        ApiUnauthorizedResponse({
          description: 'Invalid username / password',
          type: ApiError,
        })
      );
    case AuthRoute.REFRESH:
      return applyDecorators(
        ApiBody({ type: Refresh }),
        ApiOkResponse({ description: 'Token Refreshed', type: Token }),
        ApiUnauthorizedResponse({
          description: 'Invalid Refresh Token',
          type: ApiError,
        })
      );
    case AuthRoute.USER:
      return applyDecorators(
        ApiOkResponse({ description: 'User Fetched', type: UserDto }),
        ApiUnauthorizedResponse({
          description: 'Invalid Refresh Token',
          type: ApiError,
        })
      );
  }
}
