import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { MentorsModule } from './mentors/mentors.module';
dotenv.config({ path: './.env' });

@Module({
  imports: [
    UsersModule, 
    MentorsModule,
    AuthModule,
    MentorsModule,
    MongooseModule.forRoot(process.env.DATABASE_ACCESS)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
