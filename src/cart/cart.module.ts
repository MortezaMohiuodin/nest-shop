import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './schemas/cart.schema';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

const innerCartModule = MongooseModule.forFeature([
  { name: Cart.name, schema: CartSchema },
]);

@Module({
  imports: [innerCartModule, UserModule, ProductModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
