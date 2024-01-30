import { Prisma }     from '@prisma/client';
import { connection } from '@/services/prisma';

import { IUsersRepository } from './users-repository';

export class PrismaUsersRepository implements IUsersRepository {
	private repository: Prisma.UsersDelegate;
	constructor() {
		this.repository = connection.users;
	}

	async create( { nickname, email, password } : Prisma.UsersCreateInput) {
		return await this.repository.create({
			data: {
				nickname,
				email,
				password
			}
		});
	}
	
	async findByEmail(email: string) {
		return await this.repository.findUnique({
			where: {
				email
			}
		});
	} 
}