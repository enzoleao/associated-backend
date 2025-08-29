import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ClientSigninRequestDto {
  @ApiProperty()
  @IsString({ message: 'Telefone invalido' })
  phone_number: string;

  @ApiProperty()
  @IsString({ message: 'Codigo invalido' })
  @MinLength(6)
  auth_code?: string;
}
