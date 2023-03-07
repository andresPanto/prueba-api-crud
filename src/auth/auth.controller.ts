import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Get access token',
    description:
      'Returns access token for Create, Update and Delete operations',
  })
  @ApiResponse({ type: '{ accessToken: string }' })
  @Get('')
  async getToken(): Promise<{ accessToken: string }> {
    return this.authService.getToken();
  }
}
