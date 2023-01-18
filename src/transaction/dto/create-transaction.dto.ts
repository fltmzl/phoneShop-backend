import { IsMongoId } from 'class-validator';

export class CreateTransactionDto {
  @IsMongoId()
  order_id: string;

  transactionDetails: any;
}
