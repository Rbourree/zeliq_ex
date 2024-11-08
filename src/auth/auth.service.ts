import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthResponseDto } from './dto/authResponse.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService, private prisma: PrismaService) { }

  // Se connecter
  async signIn(data: AuthDto): Promise<AuthResponseDto> {

    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new HttpException('User unknow', HttpStatus.UNAUTHORIZED);
    }
    
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.id_user, email: user.email };

    const response: AuthResponseDto = { ...user, token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET }) }
    return response;
  }

  async signUp(data: AuthDto): Promise<AuthResponseDto> {

    try {
      const salt = await bcrypt.genSalt();

      data.password = await bcrypt.hash(data.password, salt);
      const user = await this.prisma.user.create({ data: data });
      const payload = { sub: user.id_user, email: user.email };
      return { ...user, token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET }) }
    } catch (error) {
      if(error.code === 'P2002'){
        throw new HttpException("Account already exist", HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
