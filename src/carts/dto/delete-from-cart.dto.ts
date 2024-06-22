import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteFromCartDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  cartId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  productId: number;
}
