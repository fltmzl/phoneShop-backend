import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { User } from 'src/users/schemas/user.schema';
import { UserType } from 'typings';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Post('notification')
  notif(@Body() body: any) {
    return this.updateDetailsTransaction({
      details: body,
    });
  }

  @Patch()
  updateDetailsTransaction(
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.updateDetailsTransaction(updateTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    const user: UserType = req.user;
    return this.transactionService.findAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const user: UserType = req.user;
    return this.transactionService.findOne(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() req,
  ) {
    const user: UserType = req.user;
    return this.transactionService.update(user, id, updateTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const user: UserType = req.user;
    return this.transactionService.remove(user, id);
  }
}
