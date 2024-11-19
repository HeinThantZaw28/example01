import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findOne(signInDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user && user.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    const { password, ...results } = user;
    const payload = { sub: results.id, name: results.name };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
      userInfo: results,
    };
  }
}
