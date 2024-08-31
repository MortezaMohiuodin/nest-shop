import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
  order: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  paymentDate: Date;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
