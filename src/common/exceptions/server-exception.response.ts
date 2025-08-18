import { ApiProperty } from '@nestjs/swagger';

export class ServerExceptionResponse {
  @ApiProperty({
    example: 'Cannot ...',
    description: 'Message of the exception',
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
    description: 'Name of the exception',
  })
  error: string;

  @ApiProperty({ example: '404', description: 'Project-specific error code' })
  statusCode: number;
}
