import type { AutogestionModuleName } from '../../../Shared/tracking/AutogestionModuleName.js';

export interface TrackAutogestionInteractionInput {
  moduleName: AutogestionModuleName;
  flowClientId: number;
  occurredAt?: Date | undefined;
}
