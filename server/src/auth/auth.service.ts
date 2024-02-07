import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(username, password) {
    const user = await this.usersService.findUserByUsername(username);
    if (user !== null) {
      // Compare the passwords
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      console.log('user does not exist');
    }
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async signUp(name, email, username, password) {
    const hashedPassword = await this.hashPassword(password);
    const user = await this.usersService.addUser(
      name,
      email,
      username,
      hashedPassword,
    );
    console.log('USER', user);
  }
}
