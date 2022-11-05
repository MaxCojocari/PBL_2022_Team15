import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MentorSchema } from "./mentor.model";

import { MentorsController } from "./mentors.controller";
import { MentorsService } from "./mentors.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Mentor', schema: MentorSchema}])
    ],
    controllers: [MentorsController],
    providers: [MentorsService]
})
export class MentorsModule{}