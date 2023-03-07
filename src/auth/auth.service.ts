import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  _logger = new Logger(AuthService.name);
  constructor(private jwtService: JwtService) {}

  async getToken(): Promise<{ accessToken: string }> {
    this._logger.log(`[${this.getToken.name}] Requesting new token`);
    const payload: JwtPayload = { username: 'my user name' };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
