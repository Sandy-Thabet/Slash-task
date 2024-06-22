import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  public async createOrder(@Body() dto: CreateOrderDto) {
    return await this.orderService.createOrder(dto);
  }
}
