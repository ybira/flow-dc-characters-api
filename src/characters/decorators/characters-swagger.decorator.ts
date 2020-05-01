import { CharacterDto } from '@api/characters/models/character.dto';
import { Alignment } from '@api/database/entities/character.entity';
import { ApiError } from '@api/shared/models/api-error.model';
import { PagedResponse } from '@api/shared/models/paged-response.model';
import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

export enum CharacterRoute {
  POST_CHARACTER = 1,
  GET_CHARACTERS,
  GET_CHARACTER,
  PUT_CHARACTER,
  DELETE_CHARACTER,
  GET_CHARACTERS_PAGINATED,
}

export function CharactersSwagger(route: CharacterRoute) {
  switch (route) {
    case CharacterRoute.POST_CHARACTER:
      return applyDecorators(
        ApiCreatedResponse({ description: 'Character created', type: CharacterDto }),
        ApiBadRequestResponse({ description: 'Bad request', type: ApiError })
      );
    case CharacterRoute.GET_CHARACTERS:
      return applyDecorators(
        ApiQuery({ name: 'alignment', enum: Alignment }),
        ApiQuery({ name: 'text', type: String }),
        ApiBadRequestResponse({ description: 'Bad request', type: ApiError }),
        ApiOkResponse({ description: 'Characters fetched', type: [CharacterDto] })
      );
    case CharacterRoute.GET_CHARACTERS_PAGINATED:
      return applyDecorators(
        ApiQuery({ name: 'page', type: Number }),
        ApiQuery({ name: 'pagePer', type: Number }),
        ApiQuery({ name: 'alignment', enum: Alignment }),
        ApiQuery({ name: 'text', type: String }),
        ApiOkResponse({ description: 'Characters fetched', type: PagedResponse }),
        ApiBadRequestResponse({ description: 'Bad request', type: ApiError })
      );
    case CharacterRoute.GET_CHARACTER:
      return applyDecorators(
        ApiParam({ name: 'id' }),
        ApiOkResponse({ description: 'Character fetched', type: CharacterDto }),
        ApiBadRequestResponse({ description: 'Bad request', type: ApiError })
      );
    case CharacterRoute.PUT_CHARACTER:
      return applyDecorators(
        ApiParam({ name: 'id' }),
        ApiOkResponse({ description: 'Character updated', type: CharacterDto }),
        ApiBadRequestResponse({ description: 'Bad request', type: ApiError })
      );
    case CharacterRoute.DELETE_CHARACTER:
      return applyDecorators(
        ApiParam({ name: 'id' }),
        ApiOkResponse({ description: 'Character deleted', type: CharacterDto }),
        ApiBadRequestResponse({ description: 'Bad request', type: ApiError })
      );
  }
}
