import { AuthService } from './auth.service';
import { KeyDto } from './dto/login.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { IpAddress } from '../decorators/ip-adress.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get()
  async hello() {
    return 'Auth module';
  }

  @Post('login')
  async login(@IpAddress() clientIp: string, @Body() dto: KeyDto) {
    return this.service.login(clientIp, dto);
  }

  @Post('logout')
  async logout(@IpAddress() clientIp: string, @Body() dto: KeyDto) {
    return this.service.logout(clientIp, dto);
  }
}
