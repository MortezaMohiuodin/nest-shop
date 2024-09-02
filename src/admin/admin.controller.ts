import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }
  @Get('users/:id')
  async getUserById(@Param('id') userId: string) {
    return this.adminService.getUserById(userId);
  }
  @Delete('users/:id')
  async deleteUser(@Param('id') userId: string) {
    return this.adminService.deleteUser(userId);
  }
  @Get('products')
  async getAllProducts() {
    return this.adminService.getAllProducts();
  }
  @Delete('products/:id')
  async deleteProdcut(@Param('id') productId: string) {
    return this.adminService.deleteProduct(productId);
  }

  @Get('orders')
  async getAllOrders() {
    return this.adminService.getAllOrders();
  }

  @Delete('orders/:id')
  async deleteOrder(@Param('id') orderId: string) {
    return this.adminService.deleteOrder(orderId);
  }
}
