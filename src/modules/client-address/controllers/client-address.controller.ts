import { Body, Controller } from '@nestjs/common';
import { Endpoint } from '@/common/decorators/endpoint';
import { formatResponse } from '@/common/helpers/format-response';
import { CreateClientAddressRequestDto } from '../dtos/create-client-address/create-client-address.dto';
import { CreateClientAddressUseCase, GetClientAddressesUseCase } from '../use-cases';
import { SuccessMessages } from '@/common/messages';

@Controller('client-address')
export class ClientAddressController {
  constructor(
    private readonly createClientAddressUseCase: CreateClientAddressUseCase,
    private readonly getClientAddressesUseCase: GetClientAddressesUseCase
  ){}

  private formatResponseWithMessage<T>(message: string, data: T) {
    return formatResponse(message, data);
  }
  @Endpoint({
    method: 'POST',
    summary: 'Create Client Address.',
    isProtectedRoute: true,
  })
  async createClientAddress(@Body() createClientAddressDto: CreateClientAddressRequestDto) {
    const addressCreated = await this.createClientAddressUseCase.execute(createClientAddressDto)
    return this.formatResponseWithMessage(SuccessMessages.address.created, addressCreated)
  }

  @Endpoint({
    method: 'GET',
    summary: 'Get Client Address.',
    isProtectedRoute: true,
  })
  async getClientAddress() {
    const addresses = await this.getClientAddressesUseCase.execute()
    return this.formatResponseWithMessage(SuccessMessages.general.success, addresses)
  }
}
