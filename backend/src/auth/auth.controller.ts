import {
  Body,
  Controller,
  Get,
  Res,
  Post,
  UseGuards
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { SignUpDto } from './dto/signup.dto';
import LogInDto from './dto/login.dto';
import { User } from 'src/users/users.model';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @Post('/signup')
  async addUser(
    @Body() signupData: SignUpDto
  ): Promise<User & Required<{ _id: string }>> {
    const result = await this.usersService.insertUser(signupData);
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() loginData: LogInDto,
    @Res({passthrough: true}) res: Response
  ): Promise<any> {
    const cookie = await this.authService.login(loginData.email);
    res.setHeader('Set-Cookie', cookie);
    return { newCookie: cookie };
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@Res({passthrough: true}) res: Response): { message: string } {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return {
      message: 'success'
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  getHello(): string {
    return "Hello world!";
  }
}