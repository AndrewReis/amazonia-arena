import { Prisma, Users } from '@prisma/client';
import crypto           from 'node:crypto';

import { IUsersRepository } from './users-repository';

export class FakeUsersRepository implements IUsersRepository {
	private repository: Users[];

	constructor() {
		this.repository = [];
	}

	async create( { nickname, email, password} : Prisma.UsersCreateInput) {
		this.repository.push({
			id: crypto.randomUUID(),
			nickname,
			email,
			password
		});

		return this.repository[this.repository.length - 1];
	}

	async findByEmail(email: string) {
		const user = this.repository.find(user => user.email === email);
		return user || null;
	} 
}