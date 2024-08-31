import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('shipping')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShippingController {
  constructor(private shippingService: ShippingService) {}
  @Post()
  @Roles(Role.Admin)
  async createShipping(@Body() createShippingDto: CreateShippingDto) {
    return this.shippingService.createShipping(createShippingDto);
  }
  @Get('order/:orderId')
  @Roles(Role.User, Role.Admin)
  async getShippingByOrder(@Param('orderId') orderId: string) {
    return this.shippingService.getShippingByOrder(orderId);
  }
}
