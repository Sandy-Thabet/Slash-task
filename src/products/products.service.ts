import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindAllProductsDto } from './dto/find-all-products.dto';
import { Prisma } from '@prisma/client';
import { OrderMethod } from 'src/shared/enums/order-method.enum';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createProduct(dto: CreateProductDto) {
    return await this.prismaService.products.create({ data: dto });
  }

  public async getAllProducts(dto: FindAllProductsDto) {
    const orderBy: Prisma.ProductsOrderByWithRelationInput = {};
    const where: Prisma.ProductsWhereInput = {};

    if (dto?.searchText) {
      where['OR'] = [
        { name: { contains: dto.searchText } },
        { description: { contains: dto.searchText } },
      ];
    }

    if (dto?.orderBy) {
      orderBy[dto.orderBy] = dto?.orderMethod ?? OrderMethod.ASC;
    }

    const [total, products] = await Promise.all([
      this.prismaService.products.count({ where }),
      this.prismaService.products.findMany({
        skip: (dto.page - 1) * dto.size,
        take: dto.size,
        orderBy,
        where,
      }),
    ]);

    return { total, products };
  }
}
