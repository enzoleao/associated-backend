import { Body, Controller } from '@nestjs/common';
import { Endpoint } from '@/common/decorators/endpoint';
import { formatResponse } from '@/common/helpers/format-response';
import { CreateClientAddressRequestDto } from '../dtos/create-client-address/create-client-address.dto';

@Controller('client-address')
export class ClientAddressController {
  constructor(
  ){}

  private formatResponseWithMessage<T>(message: string, data: T) {
    return formatResponse(message, data);
  }
  @Endpoint({
    method: 'POST',
    summary: 'Create Client Address.',
    isProtectedRoute: true,
  })
  async createAddress(@Body() createClientAddressDto: CreateClientAddressRequestDto) {
    return createClientAddressDto
  }
}
