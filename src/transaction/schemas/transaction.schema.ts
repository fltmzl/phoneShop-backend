import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { Order } from 'src/order/schemas/order.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
  // order: Order;

  @Prop(
    raw({
      transaction_details: {
        order_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Order',
          required: true,
        },
        gross_amount: Number,
      },
      credit_card: {
        secure: Boolean,
      },
      item_details: [
        {
          _id: false,
          id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
          price: Number,
          quantity: Number,
          name: String,
        },
      ],
      customer_details: {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        first_name: String,
        last_name: String,
        email: String,
        phone: String,
        billing_address: {
          first_name: String,
          last_name: String,
          email: String,
          phone: String,
          address: String,
        },
        shipping_address: {
          first_name: String,
          last_name: String,
          email: String,
          phone: String,
          address: String,
        },
      },
    }),
  )
  orderDetails: Record<string, any>;

  @Prop()
  token: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  details: any;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
