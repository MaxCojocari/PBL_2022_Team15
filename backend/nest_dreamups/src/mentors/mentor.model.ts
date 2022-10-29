import * as mongoose from 'mongoose';

export const MentorSchema = new mongoose.Schema({
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true}, 
    email: {type: String, required: true}, 
    linkedinURL: String, 
    twitterURL: String, 
    industries: {type: Array<String>, required: true}, 
    accelerators: {type: Array<String>, required: true}
});


export interface Mentor{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    linkedinURL: string;
    twitterURL: string;
    industries: string[];
    accelerators: string[];
}