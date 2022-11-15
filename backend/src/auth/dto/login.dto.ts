import { IsEmail, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LogInDto {
  @IsEmail()
  @ApiProperty({ type: 'string', required: true })
  readonly email: string;
  
  @IsString()
  @Length(8, 255)
  @ApiProperty({ type: 'string', maxLength: 255, required: true })
  readonly password: string;
}

export default LogInDto;