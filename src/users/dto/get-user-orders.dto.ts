import { PickType } from '@nestjs/swagger';
import { FindAllDto } from 'src/shared/dto/find-all.dto';

export class GetUserOrdersDto extends PickType(FindAllDto, ['page', 'size']) {}
