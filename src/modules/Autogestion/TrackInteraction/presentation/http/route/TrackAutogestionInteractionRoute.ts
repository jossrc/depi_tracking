import type { FastifyInstance } from 'fastify';
import { requireAutogestionApiKey } from '../auth/RequireAutogestionApiKey.js';
import type { TrackAutogestionInteractionHandler } from '../handler/TrackAutogestionInteractionHandler.js';
import type { TrackAutogestionInteractionRequest } from '../request/TrackAutogestionInteractionRequest.js';
import type { TrackAutogestionInteractionResponse } from '../response/TrackAutogestionInteractionResponse.js';
import { TrackAutogestionInteractionSchema } from '../schema/TrackAutogestionInteractionSchema.js';

interface TrackAutogestionInteractionRoute extends TrackAutogestionInteractionRequest {
  Reply: TrackAutogestionInteractionResponse;
}

export interface RegisterTrackAutogestionInteractionRouteOptions {
  handler: TrackAutogestionInteractionHandler;
}

export function registerTrackAutogestionInteractionRoute(
  app: FastifyInstance,
  options: RegisterTrackAutogestionInteractionRouteOptions,
): void {
  app.post<TrackAutogestionInteractionRoute>(
    '/autogestion/interactions',
    {
      schema: TrackAutogestionInteractionSchema,
      preHandler: requireAutogestionApiKey,
    },
    options.handler.handle,
  );
}
