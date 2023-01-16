import { IsArray, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsMongoId()
  user: string;

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

  @IsNotEmpty()
  paymentMethod: string;

  @IsNotEmpty()
  status: string;
}
