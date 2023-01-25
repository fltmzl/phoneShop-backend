import { IsMongoId } from 'class-validator';

export class CreateTransactionDto {
  orderDetails: any;
  token: string;
  details: any;
  // transactionDetails: any;
}
