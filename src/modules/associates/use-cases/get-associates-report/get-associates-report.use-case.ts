import { Injectable } from '@nestjs/common';
import { AssociatesRepository } from '../../repositories/implementation/associates.repository';

@Injectable()
export class GetAssociatesReportUseCase {
  constructor(
    private readonly associatesRepository: AssociatesRepository
  ){}
  async execute() {
    const associateData = await this.associatesRepository.getAssociatesReport()

    return {
      associate_active_count: associateData.activeUsers,
      associate_total_count: associateData.totalUsers,
      retention_rate: (associateData.activeUsers / associateData.totalUsers)
    }
  }
}
