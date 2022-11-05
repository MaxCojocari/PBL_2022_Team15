import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
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
    async getAllMentors(){
        const mentors = await this.mentorService.getMentors();
        return mentors;
    }

    @Get(':id')
    getOneMentor(@Param('id') mentorId: string){
        return this.mentorService.getSingleMentor(mentorId);
    }

    @Patch(':id')
    async updateMentor(
        @Param('id') mentorId: string,
        @Body('firstName') fN: string,
        @Body('lastName') lN: string,
        @Body('email') email: string,
        @Body('linkedinURL') linkedin: string,
        @Body('twitterURL') twitter: string,
        @Body('industries') ind: string[],
        @Body('accelerators') acc: string[],
      ) {
        await this.mentorService.modifyMentor(mentorId, fN, lN, email, linkedin, twitter, ind, acc);
        return null;
      }

    @Delete(':id')
    async removeMentor(@Param('id') mentorId: string) {
      const result = await this.mentorService.deleteMentor(mentorId);
      return result;
  }
}