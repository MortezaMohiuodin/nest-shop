import { IsArray, IsString, IsNotEmpty } from 'class-validator';
import { Product } from 'src/product/schemas/product.schema';
export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  products: Product[];

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;
}
