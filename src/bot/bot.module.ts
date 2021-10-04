import { BotModelConfig } from './bot.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BotService } from './bot.service';

@Module({
  imports: [TypegooseModule.forFeature([BotModelConfig])],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
