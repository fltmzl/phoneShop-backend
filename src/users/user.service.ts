import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userModel.create(createUserDto);
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            error: error.errors,
          },
          HttpStatus.CONFLICT,
        );
      }

      console.log(error);
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll() {
    return await this.userModel.find();
  }

  async getOne(id: string) {
    return await this.userModel.findById(id);
  }

  async getOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
