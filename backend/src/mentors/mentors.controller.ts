import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { MentorsService } from "./mentors.service";

import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('mentors')
export class MentorsController {

  constructor(private readonly mentorService: MentorsService) { }

  @Post('/add')
  async addMentor(
    @Body('firstName') fN: string,
    @Body('lastName') lN: string,
    @Body('email') email: string,
    @Body('linkedinURL') linkedin: string,
    @Body('twitterURL') twitter: string,
    @Body('industries') ind: string,
    @Body('accelerators') acc: string,
  ): Promise<{ id: string }> {
    const mentorId = await this.mentorService.insertMentor(fN, lN, email, linkedin, twitter, ind, acc);
    return { id: mentorId };
  }

  @Get('/getsingle')
  getOneMentor(@Param('id') mentorId: string): any {
    return this.mentorService.getSingleMentor(mentorId);
  }

  @Patch('/update')
  async updateMentor(
    @Param('id') mentorId: string,
    @Body('firstName') fN: string,
    @Body('lastName') lN: string,
    @Body('email') email: string,
    @Body('linkedinURL') linkedin: string,
    @Body('twitterURL') twitter: string,
    @Body('industries') ind: string[],
    @Body('accelerators') acc: string[],
  ): Promise<any> {
    await this.mentorService.modifyMentor(mentorId, fN, lN, email, linkedin, twitter, ind, acc);
  }

  // TODO: add getByAccelerator, getByIndustry, getFirstMentors (for example, first three) requests
  // and protect them using @UseGuards(JwtAuthGuard)
  // getAllMentors should also be protected with JwtAuthGuard

  @Delete('/delete')
  async removeMentor(@Param('id') mentorId: string): Promise<any> {
    const result = await this.mentorService.deleteMentor(mentorId);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMentors(): Promise<any> {
    return this.mentorService.getAllMentors();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/acc')
  async getByAcc(@Body('accelerator') acc: string): Promise<any> {
    return this.mentorService.getByAccelerator(acc);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/ind')
  async getByInd(@Body('industry') ind: string): Promise<any> {
    return this.mentorService.getByIndustry(ind);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/limit')
  async getFirst(@Body('lim') limit: number): Promise<any> {
    return this.mentorService.getFirstMentors(limit);
  }
  
}