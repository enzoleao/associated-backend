import { Body, Controller } from '@nestjs/common';
import { Endpoint } from '@/common/decorators/endpoint';
import { formatResponse } from '@/common/helpers/format-response';
import { ForgetPasswordRequestDto, UserSigningRequestDto } from '@/modules/auth/dtos';
import { UserSigningUseCase } from '@/modules/auth/use-cases/user-signing/user-signing.usecase';
import { RegisterResetPasswordUseCase, ResetPasswordUseCase } from '../use-cases';
import { ResetPasswordRequestDto } from '../dtos/reset-password/reset-password-request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userSigningUseCase: UserSigningUseCase, 
    private readonly registerResetPasswordUseCase: RegisterResetPasswordUseCase,
    private readonly ResetPasswordUseCase: ResetPasswordUseCase
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
    route: '/forget-password',
    summary: 'Auth User.',
  })
  forgetPassword(@Body() forgetPasswordRequestDto: ForgetPasswordRequestDto) {
    this.registerResetPasswordUseCase.execute({email: forgetPasswordRequestDto.email, tenant_id: forgetPasswordRequestDto.tenant_id})
    return {
      message: "Caso você tenha registro, será enviado instruções para seu e-mail"
    };
  }

  @Endpoint({
    method: 'POST',
    route: '/reset-password',
    summary: 'Reset Password.',
  })
  resetPassword(@Body() resetPasswordRequestDto: ResetPasswordRequestDto) {
    return this.ResetPasswordUseCase.execute(resetPasswordRequestDto)
  }

}
