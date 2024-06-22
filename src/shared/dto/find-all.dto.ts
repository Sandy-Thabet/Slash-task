import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderMethod } from '../enums/order-method.enum';

export class FindAllDto {
  @IsOptional()
  @IsString()
  searchText?: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  size: number;

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsEnum(OrderMethod)
  orderMethod?: OrderMethod;
}
