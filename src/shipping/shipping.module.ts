import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { Shipping, ShippingSchema } from './schemas/shipping.schema';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shipping.name, schema: ShippingSchema },
    ]),
    OrderModule,
  ],
  providers: [ShippingService],
  controllers: [ShippingController],
})
export class ShippingModule {}
