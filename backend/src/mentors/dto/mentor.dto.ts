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
    @ApiProperty({type: "string", maxLength: 255})
    public linkedinURL: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: "string", required: true})
    public bio: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: "string", required: true})
    public job: string;

    @IsString()
    @ApiProperty({type: "string"})
    public company: string;
    
    @IsNotEmpty()
    @ApiProperty({isArray: true, type: "string", required: true})
    public tags: string[];
}
export default MentorDto;