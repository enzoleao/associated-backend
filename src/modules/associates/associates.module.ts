import { Module } from '@nestjs/common';
import { AssociatesController } from './controllers/associates.controller';
import { AssociatesRepository } from './repositories/implementation/associates.repository';
import { CreateAssociateUseCase, PresignProfileImageUseCase } from './use-cases';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AssociatesController],
  providers: [AssociatesRepository, CreateAssociateUseCase, PresignProfileImageUseCase],
})
export class AssociatesModule {}
