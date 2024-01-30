import { Prisma, Users } from '@prisma/client';

export interface IUsersRepository {
  create(email: Prisma.UsersCreateInput): Promise<Users>;
  findByEmail(email: string): Promise<Users | null>;
}