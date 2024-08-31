import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schemas/payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    private orderService: OrderService,
  ) {}

  async processPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { orderId, amount, paymentMethod } = createPaymentDto;
    const order = await this.orderService.getOrderById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (amount !== order.totalPrice)
      throw new BadRequestException('Invalid payment amount');
    const payment = new this.paymentModel({
      order: orderId,
      amount,
      status: 'completed',
      paymentMethod,
      paymentDate: new Date(),
    });
    order.status = 'paid';
    await order.save();
    return payment.save();
  }
  async getPaymentByOrder(orderId: string): Promise<Payment> {
    return this.paymentModel.findOne({ order: orderId }).exec();
  }
}
