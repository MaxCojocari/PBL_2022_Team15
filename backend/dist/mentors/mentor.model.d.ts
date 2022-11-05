import * as mongoose from 'mongoose';
export declare const MentorSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    firstName: string;
    lastName: string;
    email: string;
    industries: any[];
    accelerators: any[];
    linkedinURL?: string;
    twitterURL?: string;
}>;
export interface Mentor extends mongoose.Document {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    linkedinURL: string;
    twitterURL: string;
    industries: string[];
    accelerators: string[];
}
