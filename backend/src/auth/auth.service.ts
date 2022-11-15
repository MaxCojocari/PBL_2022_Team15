import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, 
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!user || !isPasswordValid) {
      throw new NotAcceptableException('wrong credentials provided')
    }

    if (user && isPasswordValid) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  } 

  async login(email: string): Promise<string> {
    const user = await this.usersService.getByEmail(email);
    const payload = { userId: user._id };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  getCookieForLogOut(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
