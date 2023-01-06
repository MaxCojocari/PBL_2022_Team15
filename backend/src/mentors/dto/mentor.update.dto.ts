import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MentorUpdateDto {

    @IsString()
    @IsOptional()
    @ApiProperty({ type: "string" })
    public firstName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: "string" })
    public lastName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: "string" })
    public email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: "string" })
    public linkedinURL: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: "string" })
    public bio: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: "string" })
    public job: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: "string" })
    public company: string;

    @IsOptional()
    @ApiProperty({ isArray: true, type: "string" })
    public tags: string[];
}
export default MentorUpdateDto;