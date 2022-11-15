import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class IndDto{

    @IsString()
    @Length(3, 15)
    @ApiProperty({type: "string", maxLength: 255, required: true})
    readonly indName: string;
}
export default IndDto;