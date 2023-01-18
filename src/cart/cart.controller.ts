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
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto, @Req() req) {
    const userId = req.user.id;
    return this.cartService.create({
      ...createCartDto,
      user: userId,
    });
  }

  @Get()
  findAll(@Req() req) {
    const userId = req.user.id;
    return this.cartService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.cartService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.cartService.update(userId, id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.cartService.remove(userId, id);
  }
}
