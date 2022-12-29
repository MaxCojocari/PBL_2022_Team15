import * as mongoose from 'mongoose';

export const MentorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  linkedinURL: String,
  bio: { type: String, required: true },
  job: { type: String, required: true },
  company: String,
  tags: { type: Array<String>, required: true },
  timestampAdded: { type: Date, required: true }
});


export interface Mentor extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  linkedinURL: string;
  bio: string;
  job: string;
  company: string;
  tags: string[];
  timestampAdded: string;
}