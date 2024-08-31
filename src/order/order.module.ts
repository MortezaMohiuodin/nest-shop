import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { orderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductModule,
    UserModule,
  ],
  providers: [OrderService],
  controllers: [orderController],
})
export class OrderModule {}
