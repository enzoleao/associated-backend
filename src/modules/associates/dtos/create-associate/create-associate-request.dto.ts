import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAssociateRequestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  image_path: string;
  
  @IsString()
  @IsOptional()
  color: string;


  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  cpf: string;

  @IsString()
  @IsOptional()
  rg: string

  @IsString()
  @IsOptional()
  profession_name: string

  @IsString()
  birthday: string;

  @IsString()
  street: string;

  @IsString()
  city: string; 
  
  @IsString()
  neighborhood: string;
  
  @IsString()
  number: string;

  @IsNumber()
  state_id: number;

  @IsString()
  zip_code: string;

  @IsNumber()
  payment_method_id: number;

  @IsString()
  membership_date: string;

  @IsString()
  payment_due_date: string;
}
