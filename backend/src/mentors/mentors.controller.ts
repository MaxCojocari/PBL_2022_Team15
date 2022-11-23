import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { MentorsService } from "./mentors.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MentorDto } from "./dto/mentor.dto";
import MentorUpdateDto from "./dto/mentor.update.dto";
import AccDto, { TagDto } from "./dto/tag.dto";
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
    const mentorId = await this.mentorService.insertMentor(mentorData);
    return { id: mentorId };
  }

  @Get('/getsingle:id')
  getOneMentor(@Param('id') mentorId: string): any {
    return this.mentorService.getSingleMentor(mentorId);
  }

  @Patch('/update:id')
  async updateMentor(
    @Param('id') mentorId: string,
    @Body() mentorData: MentorUpdateDto
  ): Promise<any> {
    await this.mentorService.modifyMentor(mentorId, mentorData);
  }

  @Delete('/delete:id')
  async removeMentor(@Param('id') mentorId: string): Promise<any> {
    const result = await this.mentorService.deleteMentor(mentorId);
    return result;
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getMentors(): Promise<any> {
    return this.mentorService.getAllMentors();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/acc')
  async getByAcc(@Body() tagDto: TagDto): Promise<any> {
    return this.mentorService.getByTag(tagDto.tagName);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/limit')
  async getFirst(@Body() limitDTO: LimitDto): Promise<any> {
    return this.mentorService.getFirstMentors(limitDTO.limitNumber);
  } 
}