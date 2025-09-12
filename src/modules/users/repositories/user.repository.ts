import { User } from '@prisma/client';

export interface IUserRepository {
  createUser(user: Partial<User>): Promise<User>;

  resetPassword({ password, user_id}: {password: string, user_id: string; }): Promise<User>
}
