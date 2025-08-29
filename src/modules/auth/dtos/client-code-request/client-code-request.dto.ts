import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, MinLength, ValidateIf } from 'class-validator';

export class ClientCodeRequestDto {
  @ApiProperty({ required: false })
  @IsPhoneNumber('BR', { message: 'Número de telefone inválido' })
  @ValidateIf((o) => !o.email)
  phone_number?: string;

  @ApiProperty({ required: false })
  @IsEmail({}, { message: 'E-mail inválido' })
  @ValidateIf((o) => !o.phone_number)
  email?: string;

  @ApiProperty()
  @IsString({ message: 'Devera ser enviado o nome' })
  name: string;


  
}
