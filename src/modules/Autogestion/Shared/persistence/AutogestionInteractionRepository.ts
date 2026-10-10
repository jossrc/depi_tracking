import type { AutogestionTimestampField } from '../tracking/AutogestionTimestampField.js';

export interface UpsertAutogestionInteractionTimestamp {
  flowClientId: number;
  field: AutogestionTimestampField;
  occurredAt: Date;
}

export interface AutogestionInteractionRepository {
  upsertTimestamp(
    input: UpsertAutogestionInteractionTimestamp,
  ): Promise<void>;
}
