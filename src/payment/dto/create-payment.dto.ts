import { IsArray, IsString, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  amount: number;

  @IsString()
  paymentMethod: string;
}
