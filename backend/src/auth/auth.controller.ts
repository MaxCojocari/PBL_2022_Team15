import { 
  Body, 
  Controller, 
  Get, 
  Res,
  Req,
  Post,  
  UseGuards 
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @Post('/signup')
  async addUser(
    @Body('surname') userSurname: string,
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);

    const result = await this.usersService.insertUser(
      userSurname,
      userName,
      userEmail,
      hashedPassword
    );

    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Req() req: Request, 
    @Res({passthrough: true}) res: Response
  ): Promise<any> {
    const jwt = await this.authService.login(req.user["_doc"]);
    res.cookie('jwt', jwt, { httpOnly: true }); 
    return { access_token: jwt };
  }

  @Post('/logout')
  logout(@Res({passthrough: true}) res: Response): any {
    res.clearCookie('jwt');
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