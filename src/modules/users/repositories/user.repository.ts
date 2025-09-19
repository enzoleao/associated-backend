import { User } from '@prisma/client';
import { ICreateUserAssociated } from '../interfaces/create-user-associated/create-user-associated.interface';

export interface IUserRepository {
  createUser(user: Partial<User>): Promise<User>;

  createUserAssociated(data: ICreateUserAssociated): Promise<User>

  resetPassword({ password, user_id}: {password: string, user_id: string; }): Promise<User>

  getUserPermissions(userId: string): Promise<any>;
}
