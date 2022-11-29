import { Request } from 'express';
import { User } from "../users/users.model";

export interface ExpressRequestInterface extends Request {
  user?: User;
}
