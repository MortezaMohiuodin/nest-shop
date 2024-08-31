import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}
