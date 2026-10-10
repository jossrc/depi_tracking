import type { FastifyInstance } from 'fastify';
import type { CheckHealthHandler } from '../handler/CheckHealthHandler.js';
import type { CheckHealthResponse } from '../response/CheckHealthResponse.js';
import { CheckHealthSchema } from '../schema/CheckHealthSchema.js';

interface CheckHealthRoute {
  Reply: CheckHealthResponse;
}

export interface RegisterCheckHealthRouteOptions {
  handler: CheckHealthHandler;
}

export function registerCheckHealthRoute(
  app: FastifyInstance,
  options: RegisterCheckHealthRouteOptions,
): void {
  app.get<CheckHealthRoute>('/health', { schema: CheckHealthSchema }, options.handler.handle);
}
