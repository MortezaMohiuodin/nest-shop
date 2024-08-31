import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/user/schemas/user.schema';
import { Product } from 'src/product/schemas/product.schema';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}
  async createOrder(createOrderDto: CreateOrderDto, user: User) {
    this.logger.log(`User ${user._id} is creating an order.`);
    const { products, address, paymentMethod } = createOrderDto;
    const totalPrice = products.reduce(
      (total, product) => total + product.price,
      0,
    );
    const newOrder = new this.orderModel({
      user: user._id,
      products: products.map((product) => product._id),
      totalPrice,
      status: 'pending',
      address,
      paymentMethod,
    });
    return newOrder.save();
  }
  async getOrdersByUser(userId: string): Promise<Order[]> {
    return this.orderModel.find({ user: userId }).populate('products').exec();
  }
  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderModel
      .findById(orderId)
      .populate('products')
      .exec();
    if (!order) {
      throw new NotFoundException('Order not found!');
    }
    return order;
  }
  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const order = await this.getOrderById(orderId);
    order.status = status;
    return order.save();
  }
  async deleteOrder(orderId: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(orderId);
  }
}
