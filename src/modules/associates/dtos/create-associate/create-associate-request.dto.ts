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

  @IsString()
  state_id: string;

  @IsString()
  zip_code: string;

  @IsString()
  payment_method_preference_id: string;

  @IsString()
  membership_date: string;

  @IsString()
  payment_due_date: string;
  
  @IsString()
  associate_plan_id: string;
  
  @IsNumber()
  associate_status_id: number;
}
