import { prop } from '@typegoose/typegoose';

export class KeyIpsModel {
  @prop()
  key: string;

  @prop({ type: () => [String] })
  ips: string[];
}
