import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(@Request() req) {
    return this.cartService.getCartByUser(req.user._id);
  }
  @Post('add/:productId')
  async addToCart(@Request() req, @Param('productId') productId: string) {
    return this.cartService.addToCart(req.user._id, productId);
  }

  @Delete('remove/:productId')
  async removeFromCart(@Request() req, @Param('productId') productId: srting) {
    return this.cartService.removeFromCart(req.user._id, productId);
  }
  @Delete('clear')
  async clearCart(@Request() req) {
    return this.cartService.clearCart(req.user._id);
  }
}
