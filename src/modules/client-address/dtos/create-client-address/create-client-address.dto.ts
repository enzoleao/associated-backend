import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateClientAddressRequestDto {
  @ApiProperty()
  @IsString()
  neighborhood: string;
 
  @ApiProperty()
  @IsString()
  @IsOptional()
  number: string;
  
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  longitude: string;

  @ApiProperty()
  @IsString()
  latitude: string;
}
