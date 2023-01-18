import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/order/schemas/order.schema';
// import { User } from 'src/users/schemas/user.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
  order_id: Order;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  transactionDetails: any;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
