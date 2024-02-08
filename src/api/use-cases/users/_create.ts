import crypto from 'node:crypto';
import { IUsersRepository } from '@/api/repositories/users/users-repository';

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
			const algorithmHash = crypto.createHash('sha256');
			algorithmHash.update(password);
			const passwordHashed = algorithmHash.digest('hex');

			const user = await this.usersRepository.create({nickname, email, password: passwordHashed});

			return {
				user
			};
		}
		throw new Error('Email already used');
	}
}