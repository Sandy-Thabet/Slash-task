import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { GetUserOrdersDto } from './dto/get-user-orders.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createUser(dto: CreateUserDto) {
    dto.password = await bcrypt.hash(dto.password, 12);

    const user = await this.prismaService.users.create({ data: dto });

    delete user.password;

    return user;
  }

  public async getAllUsers() {
    const users = await this.prismaService.users.findMany({});

    users.forEach((user) => {
      delete user.password;
    });

    return { results: users.length, users };
  }

  public async getUserOrders(userId: number, dto: GetUserOrdersDto) {
    const [total, orders] = await Promise.all([
      this.prismaService.orders.count({ where: { userId } }),
      this.prismaService.orders.findMany({
        where: { userId },
        skip: (dto.page - 1) * dto.size,
        take: dto.size,
        orderBy: { orderDate: 'desc' },
      }),
    ]);

    return { total, orders };
  }
}
