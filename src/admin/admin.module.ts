import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { OrderModule } from 'src/order/order.module';
import { CartModule } from 'src/cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, ProductModule, OrderModule, CartModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class adminModule {}
