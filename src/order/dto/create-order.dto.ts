import { IsArray, IsMongoId, IsNumber } from 'class-validator';

export class CreateOrderDto {
  _id: string;

  user?: string;

  @IsArray()
  products: [
    {
      product: string;
      quantity: Number;
      price: Number;
    },
  ];

  @IsNumber()
  totalPrice: Number;
}
