import { IsNotEmpty, IsString, IsOptional, Length, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MentorDto{

    @IsString()
    @Length(2, 12)
    @IsNotEmpty()
    @ApiProperty({type: "string", maxLength: 12, required: true})
    public firstName: string;

    @IsString()
    @Length(2, 12)
    @IsNotEmpty()
    @ApiProperty({type: "string", maxLength: 12, required: true})
    public lastName: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: "string", required: true})
    public email: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: "string", maxLength: 255, required: true})
    public linkedinURL: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({type: "string", maxLength: 255, required: true})
    public twitterURL: string;
    
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({type: "array", required: true})
    public industries: string[];
    
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({type: "array", required: true})
    public accelerators: string[];
}
export default MentorDto;