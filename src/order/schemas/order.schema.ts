import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Product } from 'src/product/schemas/product.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true, _id: false })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  _id: string;

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

  @Prop()
  // raw({
  //   transaction_details: {
  //     order_id: null,
  //     gross_amount: calculateTotalOrder(carts),
  //   },
  //   credit_card: {
  //     secure: true,
  //   },
  //   item_details,
  //   customer_details: {
  //     user_id: userId,
  //     first_name: firstname,
  //     last_name: lastname,
  //     email: email,
  //     phone: phone,
  //     billing_address: {
  //       first_name: firstname,
  //       last_name: lastname,
  //       email: email,
  //       phone: phone,
  //       address: address,
  //     },
  //     shipping_address: {
  //       first_name: firstname,
  //       last_name: lastname,
  //       email: email,
  //       phone: phone,
  //       address: address,
  //     },
  //   },
  // })
  details: Record<string, any>;

  @Prop({ required: true })
  token: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
