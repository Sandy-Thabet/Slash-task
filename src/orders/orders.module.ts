import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [SharedModule],
})
export class OrdersModule {}
