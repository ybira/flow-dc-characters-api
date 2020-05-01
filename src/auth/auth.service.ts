import { Token } from '@api/auth/models/token.model';
import { User } from '@api/database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@api/database/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      return null;
    }
    const compare = await Bcrypt.compareSync(password, user.password);
    if (user && compare) {
      return user;
    }
    return null;
  }

  async generateTokens(user: User): Promise<Token> {
    const payload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '24h' }),
    };
  }
}
