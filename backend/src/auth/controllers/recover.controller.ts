import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RecoverDto, RecoverResponseDto } from '../dto/recover.dto';

@ApiTags('auth')
@Controller('auth')
export class RecoverController {
  constructor(private authService: AuthService) { }

  @Post('/recover')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: RecoverResponseDto })
  @ApiForbiddenResponse({ description: "401 forbiden" })
  public async recover(@Res() res, @Body() data: RecoverDto) {
    const { token } = await this.authService.recoverPass(data);
    return res.send({ token });
  }
}