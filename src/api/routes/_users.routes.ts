import { FastifyInstance } from 'fastify';

export async function userRouter(app: FastifyInstance) {
	app.get('/users', async (req, res) => {
		return res.send({ routes: true });
	});
}