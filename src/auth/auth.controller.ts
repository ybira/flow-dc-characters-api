import { AuthService } from '@api/auth/auth.service';
import { AuthRoute, AuthSwagger } from '@api/auth/decorators/auth-swagger.decorator';
import { Auth } from '@api/auth/decorators/auth.decorator';
import { LocalAuthGuard } from '@api/auth/guards/local-auth.guard';
import { RefreshAuthGuard } from '@api/auth/guards/refresh-auth.guard';
import { Token } from '@api/auth/models/token.model';
import { User } from '@api/database/entities/user.entity';
import { UserDto } from '@api/users/models/user.dto';
import { Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { classToPlain, plainToClass } from 'class-transformer';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @AuthSwagger(AuthRoute.LOGIN)
  @HttpCode(200)
  public async login(@Request() req): Promise<Token> {
    return this.authService.generateTokens(req.user as User);
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  @AuthSwagger(AuthRoute.REFRESH)
  @HttpCode(200)
  public async refresh(@Request() req): Promise<Token> {
    return this.authService.generateTokens(req.user as User);
  }

  @Get('user')
  @Auth()
  @AuthSwagger(AuthRoute.USER)
  @HttpCode(200)
  public async getSelf(@Request() req): Promise<UserDto> {
    return classToPlain(plainToClass(UserDto, req.user)) as UserDto;
  }
}
