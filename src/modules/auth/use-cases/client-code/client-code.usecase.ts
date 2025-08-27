import { Injectable } from '@nestjs/common';
import { CustomBadRequestException } from '@/common/exceptions/custom-exception';
import { ErrorMessages } from '@/common/messages/error-messages';
import { ClientCodeRequestDto } from '../../dtos/client-code-request/client-code-request.dto';

@Injectable()
export class ClientCodeRequestUseCase {

  async execute(clientCode: ClientCodeRequestDto) {
    return clientCode
  }
  private throwUnauthorizedError(): never {
    throw new CustomBadRequestException(
      ['email', 'password'],
      ErrorMessages.authenticationFail,
      'UNAUTHORIZED',
    );
  }
}
