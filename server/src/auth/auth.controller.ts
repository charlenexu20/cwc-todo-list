import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

type LogInDto = {
  username: string;
  password: string;
};

type SignUpDto = {
  name: string;
  email: string;
  username: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('user')
  async getUserData(@Request() req) {
    console.log('REQ USER', req.user);
    return req.user;
  }

  @Post('/log-in')
  async logIn(@Body() logInDto: LogInDto) {
    console.log(logInDto.username, logInDto.password);
    return await this.authService.logIn(logInDto.username, logInDto.password);
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    console.log(signUpDto);
    return await this.authService.signUp(
      signUpDto.name,
      signUpDto.email,
      signUpDto.username,
      signUpDto.password,
    );
  }
}
