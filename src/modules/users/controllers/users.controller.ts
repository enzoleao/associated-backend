import { Body, Controller } from '@nestjs/common';
import { Endpoint } from '@/common/decorators/endpoint';
import { CreateUserRequestDto } from '@/modules/users/dtos';
import { CreateUserUseCase } from '@/modules/users/use-cases/create-user/create-user.usecase';
import { formatResponse } from '@/common/helpers/format-response';
import { SuccessMessages } from '@/common/messages';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  private formatResponseWithMessage<T>(message: string, data: T) {
    return formatResponse(message, data);
  }

  @Endpoint({
    method: 'POST',
    summary: 'Create User.',
    isProtectedRoute: false,
  })
  async createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    const data = await this.createUserUseCase.execute(createUserRequestDto);

    return this.formatResponseWithMessage(SuccessMessages.user.created, data);
  }
}
