import { IsMongoId, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsMongoId()
  user: string;

  @IsMongoId()
  product: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
