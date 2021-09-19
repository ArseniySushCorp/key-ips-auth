import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KeyIpsModel } from './key-ips.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: KeyIpsModel,
        schemaOptions: {
          collection: 'keyIps',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
