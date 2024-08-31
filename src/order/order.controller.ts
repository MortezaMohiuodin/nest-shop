import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { Throttle } from '@nestjs/throttler';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class orderController {
  constructor(private orderService: OrderService) {}

  @Throttle(5, 60)
  @Post()
  @Roles(Role.User)
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.orderService.createOrder(createOrderDto, req.user);
  }
  @Get()
  @Roles(Role.User, Role.Admin)
  async getOrdersByUser(@Request() req) {
    return this.orderService.getOrdersByUser(req.user._id);
  }
  @Get(':id')
  @Roles(Role.User, Role.Admin)
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Put(':id/status')
  @Roles(Role.Admin)
  async updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.orderService.updateOrderStatus(id, status);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}
