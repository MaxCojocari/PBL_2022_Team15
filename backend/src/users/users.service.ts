import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async insertUser(surname: string, name: string, email: string, password: string) {
    const newUser = new this.UserModel({
      surname,
      name,
      email, 
      password,
    });
    await newUser.save();
    return newUser;
  }

  async findUser(userEmail: string) {
    const user = await this.UserModel.findOne({ email: userEmail }).exec();
    return user;
  }
}
