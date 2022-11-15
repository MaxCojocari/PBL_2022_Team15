import { ApiProperty } from "@nestjs/swagger";

export class LimitDto{
    @ApiProperty({type: "number", required: true})
    readonly limitNumber: number;
}
export default LimitDto;