import { MentorsService } from "./mentors.service";
export declare class MentorsController {
    private readonly mentorService;
    constructor(mentorService: MentorsService);
    addMentor(fN: string, lN: string, email: string, linkedin: string, twitter: string, ind: string, acc: string): Promise<{
        id: string;
    }>;
    getAllMentors(): Promise<import("./mentor.model").Mentor[]>;
    getOneMentor(mentorId: string): Promise<import("./mentor.model").Mentor>;
    updateMentor(mentorId: string, fN: string, lN: string, email: string, linkedin: string, twitter: string, ind: string[], acc: string[]): Promise<any>;
    removeMentor(mentorId: string): Promise<import("mongodb").DeleteResult>;
}
