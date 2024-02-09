import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createAccessToken(user) {
    const payload = { sub: user.userId, username: user.username };
    return await this.jwtService.signAsync(payload);
  }

  async signUp(signUpDto: SignUpDto) {
    const usernameExists =
      (await this.usersService.findUserByUsername(signUpDto.username)).length >
      0;

    const emailExists =
      (await this.usersService.findUserByEmail(signUpDto.email)).length > 0;

    if (usernameExists) {
      throw new BadRequestException('username already exists');
    }

    if (emailExists) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await this.hashPassword(signUpDto.password);
    signUpDto.password = hashedPassword;

    const user = await this.usersService.createUser(signUpDto);
    console.log('USER', user);

    return this.createAccessToken(user);
  }

  // async logIn(username, password) {
  //   const user = await this.usersService.findUserByUsername(username);
  //   if (user !== null) {
  //     // Compare the passwords
  //     const passwordsMatch = await bcrypt.compare(password, user.password);
  //     if (!passwordsMatch) {
  //       throw new UnauthorizedException();
  //     }
  //     const payload = { sub: user.id, username: user.username };
  //     return {
  //       access_token: await this.jwtService.signAsync(payload),
  //     };
  //   } else {
  //     console.log('user does not exist');
  //   }
  // }
}
