import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop(
    raw([
      {
        _id: false,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ]),
  )
  products: Record<number, Product>;

  @Prop({ required: true })
  totalPrice: Number;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
