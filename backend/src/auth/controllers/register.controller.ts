import { Body, Controller, HttpCode, HttpStatus, Post, Get, Res, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { RegisterDto, RegisterResponseDto } from 'src/auth/dto'
import { AuthService } from '../services/auth.service';


@ApiTags('auth')
@Controller('auth')
export class RegisterController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: RegisterResponseDto })
  public async register(@Res() res, @Body() data: RegisterDto) {
    const { token } = await this.authService.register(data);

    return res.send({ token });
  }
}
