import { Endpoint } from '@/common/decorators/endpoint';
import { Body, Controller, Query } from '@nestjs/common';
import { CreateAssociateRequestDto } from '../dtos/create-associate/create-associate-request.dto';
import { CreateAssociateUseCase, PresignProfileImageUseCase } from '../use-cases';
import { PresignProfileImageRequestDto } from '../dtos/presign-profile-image/presign-profile-image-request.dto';

@Controller('associates')
export class AssociatesController {
  constructor(
    private readonly createAssociateUseCase: CreateAssociateUseCase,
    private readonly presignProfileImageUseCase: PresignProfileImageUseCase,
  ){}

  @Endpoint({
      method: 'POST',
      summary: 'Create Associated.',
    })
  createAssociate(@Body() createAssociatedRequestDTO: CreateAssociateRequestDto) {
    return this.createAssociateUseCase.execute(createAssociatedRequestDTO)
  }

  @Endpoint({
      method: 'GET',
      route: 'presign-profile-image',
      summary: 'Get Presign Profile Image Url.',
      isProtectedRoute: true
    })
  getPresignUrlProfileImage(@Query() presignProfileImageRequestDto: PresignProfileImageRequestDto) {
    return this.presignProfileImageUseCase.execute(presignProfileImageRequestDto)
  }
}
