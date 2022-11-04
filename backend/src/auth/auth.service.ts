import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!user) {
      throw new NotAcceptableException('user not found')
    }

    if (user && isPasswordValid) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  } 

  async login(user: any) {
    const payload = { email: user["email"] }

    return this.jwtService.sign(payload);
  }
}
