import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, JwtService, AuthService],
})
export class AuthModule {}
