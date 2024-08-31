import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import { Model } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async getCartByUser(userId: string): Promise<Cart> {
    let cart = await this.cartModel
      .findOne({ user: userId })
      .populate('products')
      .exec();
    if (!cart) {
      cart = new this.cartModel({
        user: userId,
        products: [],
        totalPrice: 0,
        totalItems: 0,
      });
      await cart.save();
    }
    return cart;
  }

  async addToCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.getCartByUser(userId);
    const product: Product = await this.cartModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    cart.products.push(product);
    cart.totalPrice += product.price;
    cart.totalItems += 1;
    return cart.save();
  }

  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.getCartByUser(userId);
    const productIndex = cart.products.findIndex(
      (product) => product._id.toString() == productId,
    );
    if (productIndex === -1)
      throw new NotFoundException('Product not found in cart');

    const product = cart.products[productIndex];
    cart.products.splice(productIndex, 1);
    cart.totalPrice -= product.price;
    cart.totalItems -= 1;
    return cart.save();
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.getCartByUser(userId);
    cart.products = [];
    cart.totalPrice = 0;
    cart.totalItems = 0;

    return cart.save();
  }
}
