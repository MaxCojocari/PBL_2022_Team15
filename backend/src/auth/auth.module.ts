import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    JwtModule.register({
    secret: process.env.SECRET,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
