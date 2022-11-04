import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    MongooseModule.forRoot(process.env.DATABASE_ACCESS)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
