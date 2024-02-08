import { describe, it, expect, beforeEach, vi } from 'vitest';
import crypto from 'node:crypto';

// use-cases
import { CreateUserUseCase } from '@/api/use-cases/users/_create';
// repositories
import { FakeUsersRepository } from '@/api/repositories/users/fake-users-repository';

describe('#Create User Use-cases', () => {
	let createUserUseCase: CreateUserUseCase;
	let fakeUsersRepository: FakeUsersRepository;

	const MOCK_ID_USER_UUID    = 'dsdsdsds-gfdgdfgfdg-bvcbcvbc-rwerwerw-kghkghkgh';
	const MOCK_PASSWORD_HASHED = 'myfakehash';

	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		createUserUseCase = new CreateUserUseCase(fakeUsersRepository);

		vi.spyOn(crypto, 'randomUUID').mockReturnValue(MOCK_ID_USER_UUID);

		vi.spyOn(crypto, 'createHash').mockReturnValue<any>({
			update: vi.fn().mockReturnThis(),
			digest: vi.fn().mockReturnValue(MOCK_PASSWORD_HASHED)
		});
	});

	it('should create a new user with encrypted password', async () => {
		// arrange
		const mockUser = {
			nickname: 'joedoe-123',
			email: 'joedoe@test.com',
			password: '123456'
		};

		//act
		const response = await createUserUseCase.execute(mockUser);

		// assert
		expect(crypto.createHash).toHaveBeenCalledWith('sha256');
		expect(response.user.id).toEqual(MOCK_ID_USER_UUID);
		expect(response.user.password).toEqual(MOCK_PASSWORD_HASHED);
	});

	it('should not create a new user if Email already used', async () => {
		// arrange
		const mockUser = {
			nickname: 'joedoe-123',
			email: 'joedoe@test.com',
			password: '123456'
		};

		//act
		await createUserUseCase.execute(mockUser);

		// assert
		expect(async () => {
			await createUserUseCase.execute(mockUser);
		}).rejects.toBeInstanceOf(Error);
	});
});
