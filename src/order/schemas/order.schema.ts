import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/user/schemas/user.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  products: Product[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true, default: 'pending' })
  status: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  paymentMethod: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
