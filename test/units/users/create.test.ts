import { describe, it, expect, beforeEach, vi } from 'vitest';

// libs
import bcrypt from 'bcrypt';

// use-cases
import { CreateUserUseCase } from '@/api/use-cases/users/_create';
// repositories
import { FakeUsersRepository } from '@/api/repositories/users/fake-users-repository';

describe('#Create User Use-cases', () => {
	let createUserUseCase: CreateUserUseCase;
	let fakeUsersRepository: FakeUsersRepository;

	const MOCK_PASSWORD_HASHED = 'adhjkashdjkash';

	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
	});

	it('should generate hash for password user', async () => {
		// arrange
		const mockUser = {
			nickname: 'joedoe-123',
			email: 'joedoe@test.com',
			password: '123456'
		};

		
		// vi.spyOn(bcrypt, 'hash').mockResolvedValue(MOCK_PASSWORD_HASHED);

		//act
		const response = await createUserUseCase.execute(mockUser);

		// assert
		console.log(response.user);
	});
});
// $2b$06$miMtlEveUdHGV/uPb0teOeejDOucXt2d9ahSkr4RU0MeBKfi2nfIa

// $2b$06$1kdvwv28ZDH2iV1OW3znCeTuCtGHMTvXLBKK1fSUQBUt07pDCTU22