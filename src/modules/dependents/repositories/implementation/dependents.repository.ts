import { Injectable } from '@nestjs/common';
import { IDependentsRepository } from '../dependents.repository';

@Injectable()
export class DependentsRepository implements IDependentsRepository {
  constructor(){}
}
