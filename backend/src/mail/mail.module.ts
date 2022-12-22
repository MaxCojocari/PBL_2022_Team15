import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailController } from './controller/mail.controller';
import { MailService } from './services/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      }
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
