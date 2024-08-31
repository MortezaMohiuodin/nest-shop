import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipping } from './schemas/shipping.schema';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class ShippingService {
  constructor(
    @InjectModel(Shipping.name) private shippingModel: Model<Shipping>,
    private orderService: OrderService,
  ) {}

  async createShipping(): Promise<Shipping> {
    const { orderId, address, shippingMethod, estimatedDeliveryDate } =
      createShippingDto;

    const order = await this.orderService.getOrderById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const shipping = new this.shippingModel({
      order: orderId,
      address,
      shippingMethod,
      trackingNumber: this.generateTrackingNumber(),
      status: 'shipped',
      estimatedDeliveryDate,
    });
    order.status = 'shipped';
    await order.save();
    return shipping.save();
  }
  async getShippingByOrder(orderId: string): Promise<Shipping> {
    return this.shippingModel.findOne({ order: orderId }).exec();
  }
  private generateTrackingNumber(): string {
    return 'TRK' + Math.floor(Math.random() * 1000000000).toString();
  }
}
