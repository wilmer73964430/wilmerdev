import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(input: RegisterDto) {
    const password = await argon2.hash(input.password);
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        password,
        role: input.role,
        profile: input.name ? { create: { name: input.name } } : undefined
      },
      include: { profile: true }
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.profile
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const match = await argon2.verify(user.password, password);
    if (!match) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return {
      token: 'mock-jwt-token',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };
  }
}
