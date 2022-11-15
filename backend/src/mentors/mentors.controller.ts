import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { MentorsService } from "./mentors.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MentorDto } from "./dto/mentor.dto";
import AccDto from "./dto/acc.dto";
import IndDto from "./dto/ind.dto";
import LimitDto from "src/mentors/dto/limit.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('mentors')
@Controller('mentors')
export class MentorsController {

  constructor(private readonly mentorService: MentorsService) { }

  @Post('/add')
  async addMentor(
    @Body() mentorData: MentorDto
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
    @Body() mentorData: MentorDto
  ): Promise<any> {
    await this.mentorService.modifyMentor(mentorId, mentorData.firstName,
                                                    mentorData.lastName,
                                                    mentorData.email,
                                                    mentorData.linkedinURL,
                                                    mentorData.twitterURL,
                                                    mentorData.industries,
                                                    mentorData.accelerators);
  }

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
  @Post('/acc')
  async getByAcc(@Body() accDTO: AccDto): Promise<any> {
    return this.mentorService.getByAccelerator(accDTO.accName);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/ind')
  async getByInd(@Body() indDTO: IndDto): Promise<any> {
    return this.mentorService.getByIndustry(indDTO.indName);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/limit')
  async getFirst(@Body() limitDTO: LimitDto): Promise<any> {
    return this.mentorService.getFirstMentors(limitDTO.limitNumber);
  } 
}