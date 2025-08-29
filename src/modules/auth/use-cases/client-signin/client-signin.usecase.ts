import { Injectable } from '@nestjs/common';
import { CustomBadRequestException } from '@/common/exceptions/custom-exception';
import { ErrorMessages } from '@/common/messages/error-messages';
import { ClientCodeAuthService } from '../../services/client-auth-code.service';
import { ClientSigninRequestDto } from '../../dtos/client-signin/client-signin-request.dto';
import { FindClientByPhoneNumberUseCase } from '@/modules/clients/use-cases/find-client-by-phone-number/find-client-by-phone-number.usecase';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClientSigninUseCase {
  constructor(
    private readonly clientCodeAuthService: ClientCodeAuthService,
    private readonly findClientByPhoneNumberUseCase: FindClientByPhoneNumberUseCase,
    private readonly jwtService: JwtService,
    
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
      const client = await this.findClientByPhoneNumberUseCase.execute(phone_number)
      
      if (!client) {
        this.throwUnauthorizedError();
      }
      const payload = {
        client: client.id,
        client_token: true
      };
      
      const token = await this.jwtService.signAsync(payload);

      return {
        message: 'Autenticação realizada com sucesso!',
        data: {
          client: {
            ...client
          },
          authorization: token
        }
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
