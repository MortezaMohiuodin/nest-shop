import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
  ) {}

  async getAllUsers() {
    return this.userService.findAll();
  }

  async getUserById(userId: string) {
    return this.userService.findById(userId);
  }

  async deleteUser(userId: string) {
    return this.userService.deleteUser(userId);
  }

  async getAllProducts() {
    return this.productService.findAll();
  }

  async deleteProduct(productId: string) {
    return this.productService.deleteProduct(productId);
  }

  async getAllOrders() {
    return this.orderService.findAll();
  }

  async deleteOrder(orderId: string) {
    return this.orderService.deleteOrder(orderId);
  }
}
