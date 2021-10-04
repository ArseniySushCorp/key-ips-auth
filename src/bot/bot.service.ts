import { BotModel } from './bot.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BOT_NOT_FOUND } from './bot.const';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(BotModel)
    private readonly botModel: ModelType<BotModel>,
  ) {}

  async findByName(name: string): Promise<BotModel> {
    const existBot = await this.botModel.findOne({ name }).exec();

    if (!existBot) {
      throw new NotFoundException(BOT_NOT_FOUND);
    }

    return existBot;
  }
}
