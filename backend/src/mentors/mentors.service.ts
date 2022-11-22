import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import MentorDto from "./dto/mentor.dto";
import MentorUpdateDto from "./dto/mentor.update.dto";
import { Mentor } from "./mentor.model";

@Injectable()
export class MentorsService {

  constructor(@InjectModel('Mentor') private readonly mentorModel: Model<Mentor>) {
  };

  async insertMentor(mentorData: MentorDto) {
    const newMentor = new this.mentorModel({
      firstName: mentorData.firstName,
      lastName: mentorData.lastName,
      email: mentorData.email,
      linkedinURL: mentorData.linkedinURL,
      twitterURL: mentorData.twitterURL,
      industries: mentorData.industries,
      accelerators: mentorData.accelerators
    });

    const result = await newMentor.save();
    return result.id as string;
  }

  async getSingleMentor(mentorId: string) {
    const mentor = await this.findMentor(mentorId);
    return mentor;
  }

  async getAllMentors(): Promise<any> {
    const mentors = await this.mentorModel.find();
    return mentors as Mentor[];
  }

  async getByAccelerator(accelerator: string): Promise<any> {
    const mentors = await this.mentorModel.find();
    const filteredMentors = new Array<Mentor>;
    
    mentors.forEach(element => {
      if(element.accelerators.includes(accelerator)){
        filteredMentors.push(element);
      }
    });

    return filteredMentors;
  }

  async getByIndustry(industry: string): Promise<any>{
    const mentors = await this.mentorModel.find().exec();
    const filteredMentors = new Array<Mentor>;
    
    mentors.forEach(element => {
      if(element.industries.includes(industry)){
        filteredMentors.push(element);
      }
    });

    return filteredMentors;
  }

  async getFirstMentors(limit: number): Promise<any>{
    const firstMentors = await this.mentorModel.find().limit(limit);
    return firstMentors;
  }

  async modifyMentor(
    mentorId: string,
    mentorData: MentorUpdateDto
  ) {
    const updatedMentor = await this.findMentor(mentorId);

    if (mentorData.firstName) {
      updatedMentor.firstName = mentorData.firstName;
    }

    if (mentorData.lastName) {
      updatedMentor.lastName = mentorData.lastName;
    }

    if (mentorData.email) {
      updatedMentor.email = mentorData.email;
    }

    if (mentorData.linkedinURL) {
      updatedMentor.linkedinURL = mentorData.linkedinURL;
    }

    if (mentorData.twitterURL) {
      updatedMentor.twitterURL = mentorData.twitterURL;
    }

    if (mentorData.industries) {
      updatedMentor.industries = mentorData.industries;
    }

    if (mentorData.accelerators) {
      updatedMentor.accelerators = mentorData.accelerators;
    }

    updatedMentor.save();
  }

  async deleteMentor(mentorId: string) {
    const result = await this.mentorModel.deleteOne({ _id: mentorId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find mentor.');
    }

    return result;
  }

  private async findMentor(id: string): Promise<Mentor> {
    let mentor;
    try {
      mentor = await this.mentorModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find mentor');
    }

    if (!mentor) {
      throw new NotFoundException('Could not find mentor');
    }

    return mentor;
  }
}