import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true })
  readonly surname: string;
  
  @IsEmail()
  @ApiProperty({ type: 'string', required: true })
  readonly email: string;
  
  @IsString()
  @Length(8, 255)
  @ApiProperty({ type: 'string', maxLength: 255, required: true })
  readonly password: string;
}

export default SignUpDto;