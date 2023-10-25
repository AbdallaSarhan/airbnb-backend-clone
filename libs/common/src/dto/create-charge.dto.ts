import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import Stripe from 'stripe';
import { CardDto } from './card.dto';

export class CreateChargeDto {
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;
  @IsNumber()
  amount: number;
}
