// dependencies
import fastify from 'fastify';
import apiRoutes from './api/routes';

const app = fastify();

app.register(apiRoutes);

export {
	app
};