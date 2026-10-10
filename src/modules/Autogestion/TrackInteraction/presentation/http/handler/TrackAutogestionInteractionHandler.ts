import type { FastifyRequest } from 'fastify';
import type { TrackAutogestionInteraction } from '../../../application/TrackAutogestionInteraction.js';
import { parseOccurredAt } from '../mapper/ParseOccurredAt.js';
import type { TrackAutogestionInteractionRequest } from '../request/TrackAutogestionInteractionRequest.js';
import type { TrackAutogestionInteractionResponse } from '../response/TrackAutogestionInteractionResponse.js';

export class TrackAutogestionInteractionHandler {
  constructor(
    private readonly trackAutogestionInteraction: TrackAutogestionInteraction,
  ) {}

  readonly handle = async (
    request: FastifyRequest<TrackAutogestionInteractionRequest>,
  ): Promise<TrackAutogestionInteractionResponse> => {
    await this.trackAutogestionInteraction.execute({
      moduleName: request.body.moduleName,
      flowClientId: request.body.clientFlowId,
      occurredAt: parseOccurredAt(request.body.occurredAt),
    });

    return { ok: true };
  };
}
