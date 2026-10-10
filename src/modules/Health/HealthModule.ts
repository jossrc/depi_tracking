import type { FastifyPluginAsync } from 'fastify';
import { appConfig } from '../../config/AppConfig.js';
import { CheckHealth } from './CheckHealth/application/CheckHealth.js';
import { CheckHealthHandler } from './CheckHealth/presentation/http/handler/CheckHealthHandler.js';
import { registerCheckHealthRoute } from './CheckHealth/presentation/http/route/CheckHealthRoute.js';

export const healthModule: FastifyPluginAsync = async (app): Promise<void> => {
  const checkHealth = new CheckHealth(appConfig.version);
  const checkHealthHandler = new CheckHealthHandler(checkHealth);

  registerCheckHealthRoute(app, { handler: checkHealthHandler });
};
