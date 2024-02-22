import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccountDetailDto, LogInDto, SignUpDto } from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createAccessToken(user: User, secret?: string) {
    const payload = { sub: user.id };

    if (secret) {
      return await this.jwtService.signAsync(payload, {
        secret,
        expiresIn: '10m',
      });
    } else {
      return await this.jwtService.signAsync(payload);
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const usernameExists = (
      await this.usersService.findUserByUsername(signUpDto.username)
    )?.username;

    const emailExists = (
      await this.usersService.findUserByEmail(signUpDto.email)
    )?.email;

    if (usernameExists) {
      throw new BadRequestException('username already exists');
    }

    if (emailExists) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await this.hashPassword(signUpDto.password);
    signUpDto.password = hashedPassword;

    const user = await this.usersService.createUser(signUpDto);

    return this.createAccessToken(user);
  }

  async verifyPassword(enteredPassword: string, existingPassword: string) {
    return await bcrypt.compare(enteredPassword, existingPassword);
  }

  async logIn(logInDto: LogInDto) {
    const user = await this.usersService.findUserByUsername(logInDto.username);

    if (user) {
      const passwordsMatch = await this.verifyPassword(
        logInDto.password,
        user.password,
      );
      if (!passwordsMatch) {
        throw new UnauthorizedException('incorrect password');
      }
    } else {
      throw new UnauthorizedException('username does not exist');
    }

    return await this.createAccessToken(user);
  }

  async changeAccountDetail(accountDetailDto: AccountDetailDto) {
    const user = await this.usersService.findUserByUsername(
      accountDetailDto.username,
    );

    if (accountDetailDto.field === 'password') {
      const plainTextPassword = accountDetailDto.value;
      const hashedPassword = await this.hashPassword(plainTextPassword);
      user[accountDetailDto.field] = hashedPassword;
    } else {
      user[accountDetailDto.field] = accountDetailDto.value;
    }

    const updateUser = await this.usersService.createUser(user);
    return {
      name: updateUser.name,
      email: updateUser.email,
      username: updateUser.username,
    };
  }

  async getProfileData(id: number) {
    const user = await this.usersService.findUserById(id);
    return {
      email: user.email,
      name: user.name,
      username: user.username,
    };
  }

  async sendResetPasswordEmail(email: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (user === null) {
      throw new BadRequestException('email not found');
    }

    // Create a JWT with the user's current hashed password as secret
    const token = await this.createAccessToken(user, user.password);

    // Send an email to the user with a link to a reset password page on the frontend with the JWT and userId as params
    return await this.mailService.sendPasswordResetEmail(user, token);
  }

  async sendNewPassword(newPassword: string, id: number, token: string) {
    // Get the user associated with that id
    const user = await this.usersService.findUserById(id);

    // Verify token using the user we just looked up's hashed password
    await this.jwtService
      .verifyAsync(token, {
        secret: user.password,
      })
      .catch(() => {
        throw new UnauthorizedException('token is invalid');
      })
      .then(async () => {
        // If we have a payload, hash the newPassword and update the user in the database
        const hashedPassword = await this.hashPassword(newPassword);
        user.password = hashedPassword;
        return await this.usersService.createUser(user);
      });
  }
}
