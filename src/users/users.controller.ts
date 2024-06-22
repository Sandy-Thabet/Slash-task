import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserOrdersDto } from './dto/get-user-orders.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  public async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Get()
  public async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':userId/orders')
  public async getUserOrders(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() dto: GetUserOrdersDto,
  ) {
    return await this.userService.getUserOrders(userId, dto);
  }
}
