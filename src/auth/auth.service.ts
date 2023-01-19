import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // async login(
  //   email: string,
  //   password: string,
  //   values: { userAgent: string; ipAddress: string },
  // ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
  //   const user = await this.userService.getOneByEmail(email);
  //   console.log(user);

  //   if (!user) return null;
  //   if (user.password !== password) return null;
  // }

  // private async newRefreshAndAccessToken(
  //   user: User,
  //   values: {userAgent: string, ipAddress: string}
  // ): Promise<{refreshToken: string; accessToken: string}> {
  //   const refreshObject = new RefreshToken({
  //     id
  //   })
  // }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getOneByEmail(email);

    if (user && user.password === password) {
      return {
        id: user._id,
        username: user.username,
      };
    }

    return null;
  }

  async login(user: any) {
    const payload = user;

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1h',
    });

    return {
      user: payload,
      accessToken,
    };
  }
}
