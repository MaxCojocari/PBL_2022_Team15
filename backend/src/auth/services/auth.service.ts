import { BadRequestException, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { JwtPayloadDto, LoginDto, LoginResponseDto, RegisterDto, RegisterResponseDto } from "../dto";
import { User } from "src/users/users.model";
import { RecoverDto, RecoverResponseDto } from "../dto/recover.dto";

@Injectable()
export class AuthService {

  @Inject(JwtService)
  private readonly jwt: JwtService;

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) { }

  async register(data: RegisterDto): Promise<RegisterResponseDto> {
    const { first_name, last_name, email, password, password_confirmation } = data;

    if (password !== password_confirmation) {
      throw new BadRequestException("Password doesn't match");
    }


    const hash = await argon.hash(password);
    const userData = {
      first_name,
      last_name,
      email,
      password: hash,
    };
    const user = await this.usersService.createUser(userData);
    if (user) {
      return await this.createToken(user);
    } else {
      throw new BadRequestException("Error");
    }
  }

  async login(data: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = data;
    const user = await this.usersService.getByEmail(email);

    if (!user || !(await argon.verify(user.password, password))) {
      throw new ForbiddenException("Auth error");
    }
    return await this.createToken(user);
  }

  async validateUser(payload: JwtPayloadDto): Promise<User | null> {
    return await this.usersService.getById(payload.user_id);
  }

  async createToken(user: User): Promise<RegisterResponseDto> {
    const payload = JwtPayloadDto.generate(user);
    const token = await this.jwt.signAsync(payload);
    return { token };
  }

  async recoverPass(data: RecoverDto): Promise<RecoverResponseDto> {
    const { email, password } = data;
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new ForbiddenException("Auth error");
    }

    user.password = await argon.hash(password);;
    user.save();

    return await this.createToken(user);
  }
}
