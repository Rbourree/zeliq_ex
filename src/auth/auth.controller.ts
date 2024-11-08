import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(('/signin'))
  signin(@Body() authDto: AuthDto) {

    return this.authService.signIn(authDto);
  }

  @Post('/signup')
  signup(@Body() authDto: AuthDto) {
    
    return this.authService.signUp(authDto);
  }
}
