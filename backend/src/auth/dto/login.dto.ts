import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @Length(1, 255)
  @ApiProperty({ type: 'string', maxLength: 255 })
  readonly email: string;

  @IsString()
  @Length(5, 255)
  @ApiProperty({ type: 'string', maxLength: 255 })
  readonly password: string;
}

export class LoginResponseDto {
  @ApiProperty({ type: 'string', maxLength: 255 })
  token: string;
}
