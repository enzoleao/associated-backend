import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ForgetPasswordRequestDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

}
