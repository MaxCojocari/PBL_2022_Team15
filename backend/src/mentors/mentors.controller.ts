import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { MentorsService } from "./mentors.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MentorDto } from "./dto/mentor.dto";
import MentorUpdateDto from "./dto/mentor.update.dto";
import { TagDto } from "./dto/tag.dto";
import LimitDto from "src/mentors/dto/limit.dto";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";

@ApiTags('mentors')
@Controller('mentors')
export class MentorsController {

  constructor(private readonly mentorService: MentorsService) { }

  @Post()
  async addMentor(
    @Body() mentorData: MentorDto
  ): Promise<{ id: string }> {
    const mentorId = await this.mentorService.insertMentor(mentorData);
    return { id: mentorId };
  }

  @Get('/:id')
  getOneMentor(@Query('id') mentorId: string): any {
    return this.mentorService.getSingleMentor(mentorId);
  }

  @Patch()
  async updateMentor(
    @Query('id') mentorId: string,
    @Body() mentorData: MentorUpdateDto
  ): Promise<any> {
    await this.mentorService.modifyMentor(mentorId, mentorData);
  }

  @Delete()
  async removeMentor(@Query('id') mentorId: string): Promise<any> {
    const result = await this.mentorService.deleteMentor(mentorId);
    return result;
  }

  @Get()
  async getMentors(): Promise<any> {
    return this.mentorService.getAllMentors();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tag')
  async getByTag(@Query() tagDto: TagDto): Promise<any> {
    return this.mentorService.getByTag(tagDto.tagName);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/limit')
  async getFirst(@Query() limitDTO: LimitDto): Promise<any> {
    return this.mentorService.getFirstMentors(limitDTO.limitNumber);
  } 
}