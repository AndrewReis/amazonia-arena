import { FastifyInstance } from 'fastify';
import { userRouter } from './_users.routes';

export default async function apiRoutes(app: FastifyInstance) {
	app.register(userRouter);
}