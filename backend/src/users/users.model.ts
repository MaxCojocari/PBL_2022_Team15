import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  }
});

export interface User extends mongoose.Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
