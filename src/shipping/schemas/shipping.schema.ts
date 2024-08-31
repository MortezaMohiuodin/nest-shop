import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Shipping extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
  order: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  shippingMethod: string;

  @Prop({ required: true })
  trackingNumber: string;

  @Prop({ required: true, default: 'pending' })
  status: string;

  @Prop({ required: true })
  estimatedDeliveryDate: Date;
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
