import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateOrderStatusRequestDto {
  @ApiProperty()
  @IsNumber()
  order_status_id: number;
}
