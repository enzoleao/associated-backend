import { User } from '@prisma/client';

export interface IUserRepository {
  createUser(user: Partial<User>): Promise<User>;
}
