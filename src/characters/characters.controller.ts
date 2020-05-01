import { Auth } from '@api/auth/decorators/auth.decorator';
import { CharacterService } from '@api/characters/character.service';
import { CharacterRoute, CharactersSwagger } from '@api/characters/decorators/characters-swagger.decorator';
import { CharacterDto } from '@api/characters/models/character.dto';
import { CharactersGetAllQueryDto } from '@api/characters/models/characters-get-all-query.dto';
import { CreateCharacterDto } from '@api/characters/models/create-character.dto';
import { Role } from '@api/database/entities/user.entity';
import { PagedResponse } from '@api/shared/models/paged-response.model';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly characterService: CharacterService) {
  }

  @Post()
  @Auth(Role.ADMIN, Role.EDITOR)
  @CharactersSwagger(CharacterRoute.POST_CHARACTER)
  public addCharacter(@Body() character: CreateCharacterDto): Promise<CharacterDto> {
    return this.characterService.addCharacter(character);
  }

  @Get()
  @Auth()
  @CharactersSwagger(CharacterRoute.GET_CHARACTERS_PAGINATED)
  public getAll(@Query() query: CharactersGetAllQueryDto): Promise<PagedResponse<CharacterDto>> {
    return this.characterService.getCharactersPaginated(query.page, query.pagePer, query.alignment, query.text)
  }

  @Get(':id')
  @Auth()
  @CharactersSwagger(CharacterRoute.GET_CHARACTER)
  public getOne(@Param('id') id: number): Promise<CharacterDto> {
    return this.characterService.getCharacter(id);
  }

  @Put(':id')
  @Auth(Role.ADMIN, Role.EDITOR)
  @CharactersSwagger(CharacterRoute.PUT_CHARACTER)
  public patchOne(@Param('id') id: number, @Body() character: CreateCharacterDto): Promise<CharacterDto> {
    return this.characterService.updateCharacter(id, character);
  }

  @Delete(':id')
  @Auth(Role.ADMIN, Role.EDITOR)
  @CharactersSwagger(CharacterRoute.DELETE_CHARACTER)
  public deleteOne(@Param('id') id: number): Promise<CharacterDto> {
    return this.characterService.deleteCharacter(id);
  }
}
