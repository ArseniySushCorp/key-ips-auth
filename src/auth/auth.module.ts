import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BotModule } from 'src/bot/bot.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KeyIpsModelConfig } from './key-ips.model';

@Module({
  imports: [TypegooseModule.forFeature([KeyIpsModelConfig]), BotModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
