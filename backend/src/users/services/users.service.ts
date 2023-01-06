import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) { }

  async createUser(user): Promise<User> {
    const newUserInfo = await new this.UserModel(user);
    return newUserInfo.save();
  }

  async getByEmail(userEmail: string) {
    const user = await this.UserModel.findOne({ email: userEmail });
    if (user) {
      return user;
    }
    throw new NotFoundException('user with this email not found');
  }

  async getById(id: string) {
    const user = await this.UserModel.findOne({ _id: id });
    if (user) {
      return user;
    }
    throw new NotFoundException('user with this id not found')
  }
}
