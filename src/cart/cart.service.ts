import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async create(createCartDto: CreateCartDto) {
    return await this.cartModel.create(createCartDto);
  }

  async findAll(userId: string) {
    return await this.cartModel.find({ user: userId }).populate("product");
  }

  async findOne(userId: string, id: string) {
    return await this.cartModel.findOne({
      $and: [{ user: userId }, { _id: id }],
    }).populate("product");
  }

  async update(userId: string, id: string, updateCartDto: UpdateCartDto) {
    return await this.cartModel.findOneAndUpdate(
      {
        $and: [{ user: userId }, { _id: id }],
      },
      updateCartDto,
      { new: true },
    );
  }

  async remove(userId: string, id: string) {
    return this.cartModel.findOneAndDelete({
      $and: [{ user: userId }, { _id: id }],
    });
  }
}
