import { ApiProperty } from '@nestjs/swagger';

export class ExceptionResponse {
  @ApiProperty({
    example: 'Token de autenticação não fornecido',
    description: 'Message of the exception',
  })
  message: string;

  @ApiProperty({
    example: 'Forbidden',
    description: 'Name of the exception',
  })
  error: string;

  @ApiProperty({ example: 403, description: 'Project-specific error code' })
  statusCode: number;
}
