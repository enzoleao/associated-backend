import { Body, Controller } from '@nestjs/common';
import { Endpoint } from '@/common/decorators/endpoint';
import { formatResponse } from '@/common/helpers/format-response';
import { UserSigningRequestDto } from '@/modules/auth/dtos';
import { UserSigningUseCase } from '@/modules/auth/use-cases/user-signing/user-signing.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly userSigningUseCase: UserSigningUseCase) {}

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
}
