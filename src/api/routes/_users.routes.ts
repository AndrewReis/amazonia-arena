import { FastifyInstance } from 'fastify';

import { makeCreateUserUseCase } from '../use-cases/users';

export async function userRouter(app: FastifyInstance) {
	app.post('/users', async (req, res) => {
		const { nickname, email, password } = req.body;

		const createUserUseCase = makeCreateUserUseCase();
		const response = await createUserUseCase.execute({ nickname, email, password } );

		return res.status(201).send(response);
	});
}