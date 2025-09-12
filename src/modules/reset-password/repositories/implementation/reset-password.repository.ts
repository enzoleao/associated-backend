import { Injectable } from '@nestjs/common';
import { IResetPasswordRepository } from '../reset-password.repository';

@Injectable()
export class ResetPasswordRepository implements IResetPasswordRepository {
  constructor(){}
}
