import { IsString, IsOptional, Length, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MentorUpdateDto{

    @IsString()
    @IsOptional()
    @ApiProperty({type: "string"})
    public firstName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({type: "string"})
    public lastName: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({type: "string"})
    public email: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({type: "string"})
    public linkedinURL: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({type: "string"})
    public twitterURL: string;
    
    @IsArray()
    @IsOptional()
    @ApiProperty({type: "array"})
    public industries: string[];
    
    @IsArray()
    @IsOptional()
    @ApiProperty({type: "array"})
    public accelerators: string[];
}
export default MentorUpdateDto;