import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecoverDto {
  @IsString()
  @Length(1, 255)
  @ApiProperty({ type: 'string', maxLength: 255 })
  readonly email: string;

  @IsString()
  @Length(8, 255)
  @ApiProperty({ type: 'string', maxLength: 255 })
  readonly password: string;
}

export class RecoverResponseDto {
  @ApiProperty({ type: 'string', maxLength: 255 })
  token: string;
}