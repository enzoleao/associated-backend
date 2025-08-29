import { Injectable } from '@nestjs/common';
import { CustomBadRequestException } from '@/common/exceptions/custom-exception';
import { ErrorMessages } from '@/common/messages/error-messages';
import { ClientCodeAuthService } from '../../services/client-auth-code.service';
import { ClientSigninRequestDto } from '../../dtos/client-signin/client-signin-request.dto';

@Injectable()
export class ClientSigninUseCase {
  constructor(
    private readonly clientCodeAuthService: ClientCodeAuthService,
  ) {}

  async execute({ phone_number, auth_code }: ClientSigninRequestDto) {
    try {
      const verified = await this.clientCodeAuthService.verifyCode({
        codeInput: auth_code,
        phone: phone_number,
      });

      if (!verified?.success) {
        this.throwUnauthorizedError();
      }

      return {
        message: 'Autenticação realizada com sucesso!',
      };
    } catch (error) {
      this.throwUnauthorizedError();
    }
  }

  private throwUnauthorizedError(): never {
    throw new CustomBadRequestException(
      ['auth_code'],
      ErrorMessages.invalidCode,
      'UNAUTHORIZED',
    );
  }
}
