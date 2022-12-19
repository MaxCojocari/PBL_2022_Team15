import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TagDto {
    @IsNotEmpty()
    @ApiProperty({ isArray: true, type: "string", required: true })
    public readonly tags: Array<string>;
}
export default TagDto;