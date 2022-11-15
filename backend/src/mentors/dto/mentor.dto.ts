import { IsNotEmpty, IsString, IsOptional, Length, IsArray } from "class-validator";

export class MentorDTO{

    @IsString()
    @Length(2, 12)
    @IsNotEmpty()
    public firstName: string;

    @IsString()
    @Length(2, 12)
    @IsNotEmpty()
    public lastName: string;
    
    @IsString()
    @IsNotEmpty()
    public email: string;
    
    @IsString()
    @IsNotEmpty()
    public linkedinURL: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public twitterURL: string;
    
    @IsArray()
    @IsNotEmpty()
    public industries: string[];
    
    @IsArray()
    @IsNotEmpty()
    public accelerators: string[];
}