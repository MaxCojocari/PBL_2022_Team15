import {
  Controller,
  Get,
  UseGuards,
  NotFoundException /*, Delete*/,
} from '@nestjs/common';

import {
  ApiHeader,
  ApiTags
} from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from "../users.model";
import { AuthUser } from "src/decorators";


@UseGuards(AuthGuard('jwt'))
@ApiHeader({ name: 'Authorization', required: true })
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/authenticated-user')
  async getAuthenticatedUser(@AuthUser() user): Promise<User> {
    if (user) {
      return user;
    } else {
      throw new NotFoundException("get user error");
    }
  }

}
