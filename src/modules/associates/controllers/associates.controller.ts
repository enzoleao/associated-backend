import { Endpoint } from '@/common/decorators/endpoint';
import { Body, Controller, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateAssociateRequestDto } from '../dtos/create-associate/create-associate-request.dto';
import { CreateAssociateUseCase, GetAssociateByIdUseCase, GetAssociatesReportUseCase, GetAssociatesUseCase, GetPdfReportUseCase, PresignProfileImageUseCase } from '../use-cases';
import { PresignProfileImageRequestDto } from '../dtos/presign-profile-image/presign-profile-image-request.dto';
import { GetAssociatesRequestParams } from '../dtos/get-associates/get-associates-request.dto';

@Controller('associates')
export class AssociatesController {
  constructor(
    private readonly createAssociateUseCase: CreateAssociateUseCase,
    private readonly presignProfileImageUseCase: PresignProfileImageUseCase,
    private readonly getAssociatesUseCase: GetAssociatesUseCase,
    private readonly getAssociatesReportUseCase: GetAssociatesReportUseCase,
    private readonly getAssociatesByIdUseCase: GetAssociateByIdUseCase,
    private readonly getAssociatePdfReportUseCase: GetPdfReportUseCase
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


  @Endpoint({
    method: 'GET',
    route: ':id',
    summary: 'Get Associate By Id.',
    isProtectedRoute: true
  })
  getAssociateById(@Param('id') associatedId: string) {
    return this.getAssociatesByIdUseCase.execute(associatedId)
  } 
  
  @Endpoint({
    method: 'GET',
    route: 'pdf-report/:id',
    summary: 'Get Pdf Report By User Id.',
    isProtectedRoute: true
  })
  async associatePdfReport(@Param('id') associatedId: string, @Res() res: Response) {
    const pdfBuffer = await this.getAssociatePdfReportUseCase.execute(associatedId)
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=relatorio-associado.pdf',
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  }
}
