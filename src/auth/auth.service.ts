import { getBotName } from './auth.helpers';
import { BotService } from './../bot/bot.service';
import { KeyIpsModel } from './key-ips.model';
import { KeyDto } from './dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import {
  AUTHORIZED,
  IP_ALREADY_LOGIN,
  IP_NOT_EXIST,
  IP_NOT_VALID,
  KEY_NOT_VALID,
  LOGOUT,
  MORE_THEN_LIMIT,
} from './auth.const';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(KeyIpsModel)
    private readonly model: ModelType<KeyIpsModel>,
    private readonly botService: BotService,
  ) {}

  async login(clientIp: string | null, dto: KeyDto) {
    if (!clientIp) {
      throw new UnauthorizedException(IP_NOT_VALID);
    }

    const existModel = await this.model.findOne({ key: dto.key }).exec();

    if (!existModel) {
      throw new UnauthorizedException(KEY_NOT_VALID);
    }

    if (existModel.ips.includes(clientIp)) {
      throw new UnauthorizedException(IP_ALREADY_LOGIN);
    }

    if (existModel.ips.length >= existModel.limit) {
      throw new UnauthorizedException(MORE_THEN_LIMIT);
    }

    const bot = await this.botService.findByName(getBotName(dto.key));

    existModel.ips.push(clientIp);

    await existModel.save();

    return AUTHORIZED(bot.data);
  }

  async logout(clientIp: string | null, dto: KeyDto) {
    if (!clientIp) {
      throw new UnauthorizedException(IP_NOT_VALID);
    }

    const existModel = await this.model.findOne({ key: dto.key }).exec();

    if (!existModel) {
      throw new UnauthorizedException(KEY_NOT_VALID);
    }

    if (!existModel.ips.includes(clientIp)) {
      throw new UnauthorizedException(IP_NOT_EXIST);
    }

    existModel.ips = existModel.ips.filter((ip) => ip !== clientIp);

    await existModel.save();

    return LOGOUT;
  }
}
