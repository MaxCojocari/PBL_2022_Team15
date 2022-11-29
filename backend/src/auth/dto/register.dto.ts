import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @ApiProperty({ type: 'string', maxLength: 255 })
  public readonly first_name: string;

  @IsString()
  @ApiProperty({ type: 'string', maxLength: 255 })
  public readonly last_name: string;

  @IsString()
  @ApiProperty({ type: 'string', maxLength: 255 })
  public readonly email: string;

  @IsString()
  @ApiProperty({ type: 'string', maxLength: 255 })
  public readonly password: string;

  @IsString()
  @ApiProperty({ type: 'string', maxLength: 255 })
  public readonly password_confirmation: string;
}

export class RegisterResponseDto {
  @ApiProperty({ type: 'string', maxLength: 255 })
  token: string;
}
