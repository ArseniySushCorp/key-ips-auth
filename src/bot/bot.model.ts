import { prop } from '@typegoose/typegoose';

export class BotModel {
  @prop()
  name: string;

  @prop()
  data: string;
}

export const BotModelConfig = {
  typegooseClass: BotModel,
  schemaOptions: {
    collection: 'bots',
  },
};
