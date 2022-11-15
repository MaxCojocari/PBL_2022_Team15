import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true
  },
  name: {
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
  surname: string;
  name: string;
  email: string;
  password: string;
}