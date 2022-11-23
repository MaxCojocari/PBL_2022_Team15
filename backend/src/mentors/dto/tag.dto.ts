import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class TagDto{

    @IsString()
    @ApiProperty({type: "string", maxLength: 255, required: true})
    readonly tagName: string;
}
export default TagDto;