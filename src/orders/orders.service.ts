import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ApplyCouponDto } from './dto/apply-coupon.dto';

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
        data: { total: subTotal, subTotal, userId: dto.userId },
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

  public async getOrderById(orderId: number) {
    const order = await this.prismaService.orders.findFirst({
      where: { orderId },
      include: { orderItem: { include: { product: true } } },
    });

    if (!order) {
      throw new NotFoundException('Order is not exist.');
    }

    return { order };
  }

  public async upadteOrderStatus(orderId: number, dto: UpdateOrderStatusDto) {
    const order = await this.prismaService.orders.findFirst({
      where: { orderId },
    });

    if (!order) {
      throw new NotFoundException('Order is not exist.');
    }

    return await this.prismaService.orders.update({
      where: { orderId },
      data: dto,
    });
  }

  public async applyCoupon(dto: ApplyCouponDto) {
    const coupon = await this.prismaService.coupons.findFirst({
      where: { code: dto.code },
    });

    if (!coupon) {
      throw new BadRequestException('Invalid Coupon.');
    }

    const order = await this.prismaService.orders.findFirst({
      where: { orderId: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order is not exist.');
    }

    order.discount = order.subTotal * (coupon.discountPercentage / 100);
    order.total = order.subTotal - order.discount;
    order.couponId = coupon.id;

    return await this.prismaService.orders.update({
      where: { orderId: dto.orderId },
      data: order,
    });
  }
}
