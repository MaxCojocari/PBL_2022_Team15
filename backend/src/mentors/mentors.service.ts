import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Mentor } from "./mentor.model";

@Injectable()
export class MentorsService {

  constructor(@InjectModel('Mentor') private readonly mentorModel: Model<Mentor>) {
  };

  async insertMentor(fN: string, lN: string, email: string, linkedin: string, twitter: string, ind: string, acc: string) {
    const newMentor = new this.mentorModel({
      firstName: fN,
      lastName: lN,
      email,
      linkedinURL: linkedin,
      twitterURL: twitter,
      industries: ind,
      accelerators: acc
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
    firstName: string,
    lastName: string,
    email: string,
    linkedinURL: string,
    twitterURL: string,
    industries: string[],
    accelerators: string[]
  ) {
    const updatedMentor = await this.findMentor(mentorId);

    if (firstName) {
      updatedMentor.firstName = firstName;
    }

    if (lastName) {
      updatedMentor.lastName = lastName;
    }

    if (email) {
      updatedMentor.email = email;
    }

    if (linkedinURL) {
      updatedMentor.linkedinURL = linkedinURL;
    }

    if (twitterURL) {
      updatedMentor.twitterURL = twitterURL;
    }

    if (industries) {
      updatedMentor.industries = industries;
    }

    if (accelerators) {
      updatedMentor.accelerators = accelerators;
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