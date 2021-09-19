import { IsString } from 'class-validator';

export class KeyDto {
  @IsString()
  readonly key: string;
}
