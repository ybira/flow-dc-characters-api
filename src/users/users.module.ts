import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@api/database/repositories/user.repository';
import { UsersController } from '@api/users/users.controller';
import { UsersService } from '@api/users/users.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5,
      max: 10,
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
})
export class UsersModule {}
