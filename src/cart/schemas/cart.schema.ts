import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import mongoose from 'mongoose';

@Schema()
export class Cart extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Schema.Types.ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
  products: Product[];

  @Prop({ required: true, default: 0 })
  totalPrice: number;

  @Prop({ required: true, default: 0 })
  totalItems: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
