import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Mentor } from "./mentor.model";

@Injectable()
export class MentorsService{

    constructor(@InjectModel('Mentor') private readonly mentor: Model<Mentor>){
    };

    async insertMentor(fN: string, lN: string, email: string, linkedin: string, twitter: string, ind: string, acc: string){
        const newMentor = new this.mentor({
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

    async getMentors(){
        const result = await this.mentor.find();
        console.log(result);
    }
}