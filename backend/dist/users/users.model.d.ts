import * as mongoose from "mongoose";
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    surname: string;
    name: string;
    email: string;
    password: string;
}>;
export interface User extends mongoose.Document {
    _id: string;
    surname: string;
    name: string;
    email: string;
    password: string;
}
