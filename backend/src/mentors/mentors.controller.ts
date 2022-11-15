import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { MentorsService } from "./mentors.service";

import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MentorDTO } from "./dto/mentor.dto";

@Controller('mentors')
export class MentorsController {

  constructor(private readonly mentorService: MentorsService) { }

  @Post('/add')
  async addMentor(
    @Body() mentorData: MentorDTO
  ): Promise<{ id: string }> {
    const mentorId = await this.mentorService.insertMentor(mentorData.firstName,
                                                          mentorData.lastName,
                                                          mentorData.email,
                                                          mentorData.linkedinURL,
                                                          mentorData.twitterURL,
                                                          mentorData.industries,
                                                          mentorData.accelerators);
    return { id: mentorId };
  }

  @Get('/getsingle')
  getOneMentor(@Param('id') mentorId: string): any {
    return this.mentorService.getSingleMentor(mentorId);
  }

  @Patch('/update')
  async updateMentor(
    @Param('id') mentorId: string,
    @Body() mentorData: MentorDTO
  ): Promise<any> {
    await this.mentorService.modifyMentor(mentorId, mentorData.firstName,
                                                    mentorData.lastName,
                                                    mentorData.email,
                                                    mentorData.linkedinURL,
                                                    mentorData.twitterURL,
                                                    mentorData.industries,
                                                    mentorData.accelerators);
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