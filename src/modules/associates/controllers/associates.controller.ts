import { Endpoint } from '@/common/decorators/endpoint';
import { Body, Controller, Query } from '@nestjs/common';
import { CreateAssociateRequestDto } from '../dtos/create-associate/create-associate-request.dto';
import { CreateAssociateUseCase, GetAssociatesReportUseCase, GetAssociatesUseCase, PresignProfileImageUseCase } from '../use-cases';
import { PresignProfileImageRequestDto } from '../dtos/presign-profile-image/presign-profile-image-request.dto';
import { GetAssociatesRequestParams } from '../dtos/get-associates/get-associates-request.dto';

@Controller('associates')
export class AssociatesController {
  constructor(
    private readonly createAssociateUseCase: CreateAssociateUseCase,
    private readonly presignProfileImageUseCase: PresignProfileImageUseCase,
    private readonly getAssociatesUseCase: GetAssociatesUseCase,
    private readonly getAssociatesReportUseCase: GetAssociatesReportUseCase,
  ){}

  @Endpoint({
      method: 'POST',
      summary: 'Create Associated.',
      isProtectedRoute: true
    })
  createAssociate(@Body() createAssociatedRequestDTO: CreateAssociateRequestDto) {
    return this.createAssociateUseCase.execute(createAssociatedRequestDTO)
  }

  @Endpoint({
    method: 'GET',
    summary: 'Get Associates.',
    isProtectedRoute: true
  })
  getAssociates(@Query() getAssociatesRequestParams: GetAssociatesRequestParams) {
    return this.getAssociatesUseCase.execute(getAssociatesRequestParams)
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
  
  @Endpoint({
      method: 'GET',
      route: 'associate-report',
      summary: 'Get Presign Profile Image Url.',
      isProtectedRoute: true
    })
  getAssociateReport() {
    return this.getAssociatesReportUseCase.execute()
  }
}
