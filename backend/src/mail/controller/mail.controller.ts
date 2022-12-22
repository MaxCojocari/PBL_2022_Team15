import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import SenderDto from "../dto/sender.dto";
import { MailService } from "../services/mail.service";

@Controller('mail')
export class MailController{
    constructor(private readonly mailService: MailService) { }

    @Post()
    async email(@Body() senderDto: any): Promise<any> {
        console.log(senderDto);
        return this.mailService.sendMail(senderDto);
    }
}