import { Model } from "mongoose";
import { Mentor } from "./mentor.model";
export declare class MentorsService {
    private readonly mentorModel;
    constructor(mentorModel: Model<Mentor>);
    insertMentor(fN: string, lN: string, email: string, linkedin: string, twitter: string, ind: string, acc: string): Promise<string>;
    getMentors(): Promise<Mentor[]>;
    getSingleMentor(mentorId: string): Promise<Mentor>;
    modifyMentor(mentorId: string, firstName: string, lastName: string, email: string, linkedinURL: string, twitterURL: string, industries: string[], accelerators: string[]): Promise<void>;
    deleteMentor(mentorId: string): Promise<import("mongodb").DeleteResult>;
    private findMentor;
}
