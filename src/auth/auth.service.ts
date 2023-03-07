import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getToken(): Promise<{ accessToken: string }> {
    const payload: JwtPayload = { username: 'my user name' };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
