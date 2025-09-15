import { Injectable } from '@nestjs/common';
import { IAssociatesRepository } from '../associates.repository';
import { User } from '@prisma/client';

@Injectable()
export class AssociatesRepository implements IAssociatesRepository {
  constructor(){}
  createAssociate(): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
