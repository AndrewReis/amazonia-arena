import { IUsersRepository } from '@/api/repositories/users/users-repository';

import * as bcrypt from 'bcrypt';

type Request = {
	nickname: string;
	email: string;
	password: string;
}

export class CreateUserUseCase {
	private usersRepository: IUsersRepository;

	constructor(usersRepository: IUsersRepository) {
		this.usersRepository = usersRepository;
	}

	public async execute({ email, nickname, password }: Request) {
		const checkUserExist = await this.usersRepository.findByEmail(email);

		if (!checkUserExist) {
			const passwordHashed = await bcrypt.hash(password, 6);
			const user = await this.usersRepository.create({nickname, email, password: passwordHashed});

			return {
				user
			};
		}
		throw new Error('Email already used');
	}
}