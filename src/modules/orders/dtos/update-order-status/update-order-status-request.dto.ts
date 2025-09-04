import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateOrderStatusRequestDto {
  @ApiProperty()
  @IsNumber()
  order_status_id: number;
}
