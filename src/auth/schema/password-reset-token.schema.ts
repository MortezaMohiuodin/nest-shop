import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PasswordResetTokenDocument = PasswordResetToken & Document;

@Schema({ timestamps: true })
export class PasswordResetToken {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  token: string;

  @Prop({ default: false })
  used: boolean;

  @Prop({ default: Date.now, expires: '1h' })
  createdAt: Date;
}
export const PasswordResetTokenSchema =
  SchemaFactory.createForClass(PasswordResetToken);
