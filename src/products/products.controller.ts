import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindAllProductsDto } from './dto/find-all-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  public async createProduct(@Body() dto: CreateProductDto) {
    return await this.productService.createProduct(dto);
  }

  @Get()
  public async getAllProducts(@Query() dto: FindAllProductsDto) {
    return await this.productService.getAllProducts(dto);
  }
}
