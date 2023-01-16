import { IsString, Length, IsNotEmpty, IsEmail } from "class-validator";

export class SenderDto{

    @IsString()
    @Length(2, 12)
    @IsNotEmpty()
    public firstName: string;

    @IsString()
    @Length(2, 12)
    @IsNotEmpty()
    public lastName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @Length(3, 250)
    @IsNotEmpty()
    public msg: string;
}

export default SenderDto;