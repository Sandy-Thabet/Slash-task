import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [SharedModule],
})
export class CartsModule {}
