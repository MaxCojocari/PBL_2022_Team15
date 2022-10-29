import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';

import { MentorsModule } from './mentors/mentors.module';

@Module({
  imports: [MentorsModule,
            MongooseModule.forRoot('mongodb://localhost/mentors')],
  controllers: [],
  providers: [],
})
export class AppModule {}
