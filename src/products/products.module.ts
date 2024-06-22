import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SharedModule],
})
export class ProductsModule {}
