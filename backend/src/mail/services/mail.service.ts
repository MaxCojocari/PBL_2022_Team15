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
            to: 'help.dreamups@outlook.com',
            from: "qa.dreamups@outlook.com",
            sender: senderData.firstName + ' ' + senderData.lastName,
            text: "Question sent from: " + senderData.email + "\n" + senderData.msg,
            subject: senderData.topic
          })
           .then((success) => {
            console.log(success)
          })
          .catch((err) => {
            console.log(err)
          });
      }
      
}