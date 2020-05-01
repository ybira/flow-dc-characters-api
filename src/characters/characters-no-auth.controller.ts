import { CharacterService } from '@api/characters/character.service';
import { CharacterRoute, CharactersSwagger } from '@api/characters/decorators/characters-swagger.decorator';
import { CharacterDto } from '@api/characters/models/character.dto';
import { CharactersGetAllNotPaginatedQueryDto } from '@api/characters/models/characters-get-all-not-paginated-query.dto';
import { CharactersGetAllQueryDto } from '@api/characters/models/characters-get-all-query.dto';
import { CreateCharacterDto } from '@api/characters/models/create-character.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('no-auth/characters')
@Controller('no-auth/characters')
export class CharactersNoAuthController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @CharactersSwagger(CharacterRoute.POST_CHARACTER)
  public addCharacter(@Body() character: CreateCharacterDto): Promise<CharacterDto> {
    return this.characterService.addCharacter(character);
  }

  @Get()
  @CharactersSwagger(CharacterRoute.GET_CHARACTERS)
  public getAll(@Query() query: CharactersGetAllNotPaginatedQueryDto): Promise<CharacterDto[]> {
    return this.characterService.getCharacters(query.alignment, query.text);
  }

  @Get(':id')
  @CharactersSwagger(CharacterRoute.GET_CHARACTER)
  public getOne(@Param('id') id: number): Promise<CharacterDto> {
    return this.characterService.getCharacter(id);
  }

  @Put(':id')
  @CharactersSwagger(CharacterRoute.PUT_CHARACTER)
  public patchOne(@Param('id') id: number, @Body() character: CreateCharacterDto): Promise<CharacterDto> {
    return this.characterService.updateCharacter(id, character);
  }

  @Delete(':id')
  @CharactersSwagger(CharacterRoute.DELETE_CHARACTER)
  public deleteOne(@Param('id') id: number): Promise<CharacterDto> {
    return this.characterService.deleteCharacter(id);
  }
}
