// src/users/use-cases/create-user.use-case.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/modules/users/repositories/implementations/user-repository';
import { UserSigningRequestDto } from '@/modules/auth/dtos';
import { CustomBadRequestException } from '@/common/exceptions/custom-exception';
import { ErrorMessages } from '@/common/messages/error-messages';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserSigningUseCase {
  constructor(private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(userSigningRequestDto: UserSigningRequestDto) {
    const { email, password } = userSigningRequestDto;

    const user = await this.userRepository.findUserByEmail(email);
    if (!user || !(await compare(password, user.password))) {
      this.throwUnauthorizedError();
    }

    console.log(user)

    const payload = {
      userId: user.id,
      email: user.email,
      tenantId: user.tenant_id,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      user: { ...user, password: undefined },
      authorization: { token },
    };
  }

  private throwUnauthorizedError(): never {
    throw new CustomBadRequestException(
      ['email', 'password'],
      ErrorMessages.authenticationFail,
      'UNAUTHORIZED',
    );
  }
}
