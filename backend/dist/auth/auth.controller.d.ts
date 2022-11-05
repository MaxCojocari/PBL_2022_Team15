import { UsersService } from '../users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    addUser(userSurname: string, userName: string, userEmail: string, userPassword: string): Promise<import("../users/users.model").User & Required<{
        _id: string;
    }>>;
    login(req: Request, res: Response): Promise<any>;
    logout(res: Response): any;
    getHello(): string;
}
