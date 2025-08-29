import { Injectable } from '@nestjs/common';
import { CustomBadRequestException } from '@/common/exceptions/custom-exception';
import { ErrorMessages } from '@/common/messages/error-messages';
import { ClientCodeRequestDto } from '../../dtos/client-code-request/client-code-request.dto';
import { ClientCodeAuthService } from '../../services/client-auth-code.service';
import { CreateClientUseCase } from '@/modules/clients/use-cases/create-client/create-client.usecase';
import { FindClientByPhoneNumberUseCase } from '@/modules/clients/use-cases/find-client-by-phone-number/find-client-by-phone-number.usecase';

@Injectable()
export class ClientCodeRequestUseCase {
    constructor(
        private readonly clientCodeAuthService: ClientCodeAuthService,
        private readonly createClientUseCase: CreateClientUseCase,
        private readonly findClientByPhoneNumberUseCase: FindClientByPhoneNumberUseCase
    ){}

  async execute({ phone_number, name }: ClientCodeRequestDto) {
    if (phone_number) {
        const client = await this.findClientByPhoneNumberUseCase.execute(phone_number)

        if(!client) {
          this.createClientUseCase.execute({ phone_number, name })
        }
        return this.clientCodeAuthService.sendCode(phone_number)
    }
    
  }
  private throwUnauthorizedError(): never {
    throw new CustomBadRequestException(
      ['email', 'password'],
      ErrorMessages.authenticationFail,
      'UNAUTHORIZED',
    );
  }
}
