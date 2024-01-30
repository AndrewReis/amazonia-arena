// use-cses
import { CreateUserUseCase } from './_create';

// repository

// factory
function makeCreateUserUseCase() {
	const createUser = new CreateUserUseCase();

	return createUser;
}

// export functions factories
export {
	makeCreateUserUseCase
};