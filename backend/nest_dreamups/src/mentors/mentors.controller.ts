import { Body, Controller, Get, Post } from "@nestjs/common";
import { MentorsService } from "./mentors.service";


@Controller('mentors')
export class MentorsController{

    constructor(private readonly mentorService: MentorsService){}

    @Post()
    async addMentor(
        @Body('firstName') fN: string,
        @Body('lastName') lN: string,
        @Body('email') email: string,
        @Body('linkedinURL') linkedin: string,
        @Body('twitterURL') twitter: string,
        @Body('industries') ind: string,
        @Body('accelerators') acc: string,
    ) {
        const mentorId = await this.mentorService.insertMentor(fN, lN, email, linkedin, twitter, ind, acc);
        return {id: mentorId};
    }

    @Get()
    getAllMentors(){
        this.mentorService.getMentors();
    }
}