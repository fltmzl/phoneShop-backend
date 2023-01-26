import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from 'typings';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  // async create(createTransactionDto: CreateTransactionDto) {
  //   return await this.transactionModel.findOneAndUpdate(
  //     {
  //       order: createTransactionDto.order,
  //     },
  //     createTransactionDto,
  //     { upsert: true, new: true },
  //   );
  // }

  async create(createTransactionDto: CreateTransactionDto) {
    return await this.transactionModel.create(createTransactionDto);
  }

  findAll(user: UserType) {
    if (user.role === 'admin') {
      return this.transactionModel.find();
    }

    return this.transactionModel.find({
      'orderDetails.customer_details.user_id': user.id,
    });
  }

  findOne(user: UserType, id: string) {
    return this.transactionModel.findById(id);
  }

  updateDetailsTransaction(updateTransactionDto: UpdateTransactionDto) {
    return this.transactionModel.findOneAndUpdate(
      {
        'orderDetails.transaction_details.order_id':
          updateTransactionDto.details.order_id,
      },
      updateTransactionDto,
      {
        new: true,
      },
    );
  }

  update(
    user: UserType,
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    if (user.role === 'admin') {
      return this.transactionModel.findByIdAndUpdate(id, updateTransactionDto);
    }

    throw new HttpException(
      {
        statusCode: HttpStatus.FORBIDDEN,
        error: "You're not allowed to update data",
      },
      HttpStatus.FORBIDDEN,
    );
  }

  remove(user: UserType, id: string) {
    if (user.role === 'admin') {
      return this.transactionModel.findByIdAndDelete(id);
    }

    throw new HttpException(
      {
        statusCode: HttpStatus.FORBIDDEN,
        error: "You're not allowed to delete data",
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
