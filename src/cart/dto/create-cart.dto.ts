import { IsMongoId, IsNumber } from 'class-validator';

export class CreateCartDto {
  user?: string;

  @IsMongoId()
  product: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
