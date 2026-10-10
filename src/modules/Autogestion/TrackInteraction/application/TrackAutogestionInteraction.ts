
import type { AutogestionInteractionRepository } from '../../Shared/persistence/AutogestionInteractionRepository.js';
import { resolveAutogestionTimestampField } from '../../Shared/tracking/ResolveAutogestionTimestampField.js';
import type { TrackAutogestionInteractionInput } from './input/TrackAutogestionInteractionInput.js';

export class TrackAutogestionInteraction {
  constructor(
    private readonly autogestionInteractionRepository: AutogestionInteractionRepository,
  ) {}

  async execute(input: TrackAutogestionInteractionInput): Promise<void> {
    const field = resolveAutogestionTimestampField(input.moduleName);        
    await this.autogestionInteractionRepository.upsertTimestamp({
      flowClientId: input.flowClientId,
      field,
      occurredAt: input.occurredAt ?? new Date(),
    });
  }
}
