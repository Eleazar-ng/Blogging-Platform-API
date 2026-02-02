import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,

  ) {}

  async login(loginDto: LoginDto) {
    const user:any = await this.userService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user._id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: this.configService.get('JWT_EXPIRATION'),});

    return {
      access_token: accessToken,
      user
    }
  }
}