import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common/decorators";
import { SenderDto } from "../dto/sender.dto";

@Injectable()
export class MailService{
    constructor(private readonly mailerService: MailerService){}

    async sendMail(senderData: SenderDto): Promise<any> {
        this
          .mailerService
          .sendMail({
            to: 'dreamups@outlook.com',
            from: senderData.email,
            sender: senderData.firstName + ' ' + senderData.lastName,
            text: senderData.msg,
          })
           .then((success) => {
            console.log(success)
          })
          .catch((err) => {
            console.log(err)
          });
      }
      
}