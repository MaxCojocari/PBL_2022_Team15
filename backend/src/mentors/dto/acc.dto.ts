import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class AccDto{

    @IsString()
    @Length(3, 15)
    @ApiProperty({type: "string", maxLength: 255, required: true})
    readonly accName: string;
}
export default AccDto;