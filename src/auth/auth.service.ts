import { KeyIpsModel } from './key-ips.model';
import { KeyDto } from './dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AUTHORIZED_MESSAGE } from './auth.const';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(KeyIpsModel)
    private readonly model: ModelType<KeyIpsModel>,
  ) {}

  async login(clientIp: string, dto: KeyDto) {
    const existModel = await this.model.findOne({ key: dto.key }).exec();

    if (!existModel) {
      throw new UnauthorizedException('key not valid');
    }

    if (existModel.ips.includes(clientIp)) {
      return AUTHORIZED_MESSAGE;
    }

    if (existModel.ips.length >= 5) {
      throw new UnauthorizedException('too many ips');
    }

    existModel.ips.push(clientIp);

    await existModel.save();

    return AUTHORIZED_MESSAGE;
  }

  async logout(clientIp: string, dto: KeyDto) {
    const existModel = await this.model.findOne({ key: dto.key }).exec();

    if (!existModel) {
      throw new UnauthorizedException('key not valid');
    }

    if (!existModel.ips.includes(clientIp)) {
      throw new UnauthorizedException('ip not included');
    }

    existModel.ips = existModel.ips.filter((ip) => ip !== clientIp);

    await existModel.save();

    return 'Succesfully logout';
  }
}
