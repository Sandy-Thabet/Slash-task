import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DeleteFromCartDto } from './dto/delete-from-cart.dto';

@Controller('cart')
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @Post('add')
  public async addToCart(@Body() dto: AddToCartDto) {
    return await this.cartService.addToCart(dto);
  }

  @Get(':userId')
  public async viewCart(@Param('userId', ParseIntPipe) userId: number) {
    return await this.cartService.viewCart(userId);
  }

  @Put('update')
  public async updateCart(@Body() dto: UpdateCartDto) {
    return await this.cartService.updateCart(dto);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async removeFromCart(@Query() dto: DeleteFromCartDto) {
    return await this.cartService.removeFromCart(dto);
  }
}
