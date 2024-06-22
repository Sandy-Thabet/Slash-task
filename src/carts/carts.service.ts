import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DeleteFromCartDto } from './dto/delete-from-cart.dto';

@Injectable()
export class CartsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async addToCart(dto: AddToCartDto) {
    const cart = await this.createCartIfNotExist(dto.userId);

    const cartItem = await this.prismaService.cartItem.upsert({
      create: {
        productId: dto.productId,
        cartId: cart.cartId,
        quantity: dto.quantity,
      },
      update: { quantity: dto.quantity },
      where: {
        cartId_productId: { cartId: cart.cartId, productId: dto.productId },
      },
    });

    return cartItem;
  }

  public async viewCart(userId: number) {
    const cart = await this.prismaService.cart.findFirst({
      where: { userId },
      include: { cartItem: { include: { product: true } } },
    });

    return { cart };
  }

  public async updateCart(dto: UpdateCartDto) {
    const cartItem = await this.prismaService.cartItem.findFirst({
      where: {
        cartId: dto.cartId,
        productId: dto.productId,
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart Item is not exist.');
    }

    const cart = await this.prismaService.cartItem.update({
      data: dto,
      where: {
        cartId_productId: { cartId: dto.cartId, productId: dto.productId },
      },
    });

    return { cart };
  }

  public async removeFromCart(dto: DeleteFromCartDto) {
    const cartItem = await this.prismaService.cartItem.findFirst({
      where: {
        cartId: dto.cartId,
        productId: dto.productId,
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart Item is not exist.');
    }

    return await this.prismaService.cartItem.delete({
      where: {
        cartId_productId: { cartId: dto.cartId, productId: dto.productId },
      },
    });
  }

  private async createCartIfNotExist(userId: number) {
    let cart = await this.prismaService.cart.findFirst({ where: { userId } });

    if (!cart) {
      cart = await this.prismaService.cart.create({ data: { userId } });
    }

    return cart;
  }
}
