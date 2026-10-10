import type { FastifyPluginAsync } from 'fastify';
import { SequelizeAutogestionInteractionRepository } from './Shared/persistence/sequelize/SequelizeAutogestionInteractionRepository.js';
import { TrackAutogestionInteraction } from './TrackInteraction/application/TrackAutogestionInteraction.js';
import { TrackAutogestionInteractionHandler } from './TrackInteraction/presentation/http/handler/TrackAutogestionInteractionHandler.js';
import { registerTrackAutogestionInteractionRoute } from './TrackInteraction/presentation/http/route/TrackAutogestionInteractionRoute.js';

export const autogestionModule: FastifyPluginAsync = async (
  app,
): Promise<void> => {
  const autogestionInteractionRepository =
    new SequelizeAutogestionInteractionRepository();
  const trackAutogestionInteraction = new TrackAutogestionInteraction(
    autogestionInteractionRepository,
  );
  const trackAutogestionInteractionHandler =
    new TrackAutogestionInteractionHandler(trackAutogestionInteraction);

  registerTrackAutogestionInteractionRoute(app, {
    handler: trackAutogestionInteractionHandler,
  });
};
