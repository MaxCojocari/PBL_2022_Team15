import { Model } from 'mongoose';
import { User } from './users.model';
export declare class UsersService {
    private readonly UserModel;
    constructor(UserModel: Model<User>);
    insertUser(surname: string, name: string, email: string, password: string): Promise<User & Required<{
        _id: string;
    }>>;
    findUser(userEmail: string): Promise<User & Required<{
        _id: string;
    }>>;
}
