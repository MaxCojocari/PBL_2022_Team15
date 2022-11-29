import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto, LoginResponseDto } from '../dto';

@ApiTags('auth')
@Controller('auth')
export class LoginController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiForbiddenResponse({ description: "401 forbiden" })
  public async login(@Res() res, @Body() data: LoginDto) {
    const { token } = await this.authService.login(data);
    return res.send({ token });
  }
}
