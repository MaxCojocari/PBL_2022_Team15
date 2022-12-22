import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { MentorsService } from "../services/mentors.service";
import { UseGuards } from "@nestjs/common";
import { MentorDto } from "../dto/mentor.dto";
import MentorUpdateDto from "../dto/mentor.update.dto";
import { TagDto } from "../dto/tag.dto";
import LimitDto from "src/mentors/dto/limit.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AuthUser } from "../../decorators";


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

  // @UseGuards(AuthGuard('jwt'))
  @Post('/search')
  async getMentorsByParam(@Body() req: TagDto): Promise<any> {
    // console.log(req);
    // console.log(await this.mentorService.getByTag(req.tags));

    return this.mentorService.getByTag(req.tags);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  getOneMentor(@Query('id') mentorId: string): any {
    return this.mentorService.getSingleMentor(mentorId);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  async getMentors(): Promise<any> {
    return this.mentorService.getAllMentors();
  }

  @Get('/limit')
  async getLimitNrMentors(): Promise<any> {
    return this.mentorService.getFirstMentors(4);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Patch()
  async updateMentor(
    @Query('id') mentorId: string,
    @Body() mentorData: MentorUpdateDto
  ): Promise<any> {
    await this.mentorService.modifyMentor(mentorId, mentorData);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete()
  async removeMentor(@Query('id') mentorId: string): Promise<any> {
    const result = await this.mentorService.deleteMentor(mentorId);
    return result;
  }
}
