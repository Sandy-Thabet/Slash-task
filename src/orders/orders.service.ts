import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createOrder(dto: CreateOrderDto) {
    return await this.prismaService.$transaction(async (transaction) => {
      const cart = await transaction.cart.findFirst({
        where: { userId: dto.userId },
        include: { cartItem: { include: { product: true } } },
      });

      if (!cart || !cart.cartItem.length) {
        throw new BadRequestException('Cart is empty.');
      }

      let subTotal = 0;
      cart.cartItem.forEach((item) => {
        subTotal += item.product.price * item.quantity;
      });

      const order = await transaction.orders.create({
        data: { total: subTotal, subTotal },
      });

      const orderItem = await transaction.orderItem.createManyAndReturn({
        data: cart.cartItem.map((item) => {
          return {
            productId: item.productId,
            quantity: item.quantity,
            orderId: order.orderId,
          };
        }),
      });

      await transaction.cartItem.deleteMany({ where: { cartId: cart.cartId } });

      return { order, orderItem };
    });
  }
}
