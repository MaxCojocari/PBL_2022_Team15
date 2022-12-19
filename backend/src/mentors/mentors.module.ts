import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MentorSchema } from "./mentor.model";
import { MentorsController } from "./controllers/mentors.controller";
import { MentorsService } from "./services/mentors.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Mentor', schema: MentorSchema }])
  ],
  controllers: [MentorsController],
  providers: [MentorsService]
})
export class MentorsModule { }