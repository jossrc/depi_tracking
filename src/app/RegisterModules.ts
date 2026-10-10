import type { FastifyInstance } from 'fastify';
import { autogestionModule } from '../modules/Autogestion/AutogestionModule.js';
import { healthModule } from '../modules/Health/HealthModule.js';

export function registerModules(app: FastifyInstance): void {
  app.register(
    async (api) => {
      await api.register(healthModule);
      await api.register(autogestionModule);
    },
    {
      prefix: '/api',
    },
  );
}
