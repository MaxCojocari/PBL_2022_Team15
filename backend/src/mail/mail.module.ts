import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './controller/mail.controller';
import { MailService } from './services/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'in-v3.mailjet.com',
        auth: {
          user: process.env.API_KEY,
          pass: process.env.SECRET_KEY,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      }
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
