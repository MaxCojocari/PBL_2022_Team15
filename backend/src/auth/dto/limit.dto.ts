import { ApiProperty } from "@nestjs/swagger";

export class LimitDTO{

    @ApiProperty({type: "number", required: true})
    readonly limitNumber: number;
}
export default LimitDTO;