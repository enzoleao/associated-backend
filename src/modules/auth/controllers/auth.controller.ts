import { Body, Controller } from '@nestjs/common';
import { Endpoint } from '@/common/decorators/endpoint';
import { formatResponse } from '@/common/helpers/format-response';
import { UserSigningRequestDto } from '@/modules/auth/dtos';
import { UserSigningUseCase } from '@/modules/auth/use-cases/user-signing/user-signing.usecase';
import { ClientCodeRequestDto } from '../dtos/client-code-request/client-code-request.dto';
import { ClientCodeRequestUseCase } from '../use-cases/client-code/client-code.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userSigningUseCase: UserSigningUseCase, 
    private readonly clientCodeRequestUseCase: ClientCodeRequestUseCase
  ) {}

  private formatResponseWithMessage<T>(message: string, data: T) {
    return formatResponse(message, data);
  }
  @Endpoint({
    method: 'POST',
    route: '/signin',
    summary: 'Auth User.',
  })
  userSigning(@Body() userSigningRequestDto: UserSigningRequestDto) {
    return this.userSigningUseCase.execute(userSigningRequestDto);
  }

   @Endpoint({
    method: 'POST',
    route: '/code-request',
    summary: 'Auth Client.',
  })
  clientCode(@Body() clientCodeRequest: ClientCodeRequestDto) {
    return this.clientCodeRequestUseCase.execute(clientCodeRequest);
  }
}
