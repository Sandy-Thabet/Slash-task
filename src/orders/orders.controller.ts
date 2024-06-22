import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ApplyCouponDto } from './dto/apply-coupon.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  public async createOrder(@Body() dto: CreateOrderDto) {
    return await this.orderService.createOrder(dto);
  }

  @Get(':orderId')
  public async getOrderById(@Param('orderId', ParseIntPipe) orderId: number) {
    return await this.orderService.getOrderById(orderId);
  }

  @Put(':orderId/status')
  public async upadteOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return await this.orderService.upadteOrderStatus(orderId, dto);
  }

  @Post('apply-coupon')
  public async applyCoupon(@Body() dto: ApplyCouponDto) {
    return await this.orderService.applyCoupon(dto);
  }
}
