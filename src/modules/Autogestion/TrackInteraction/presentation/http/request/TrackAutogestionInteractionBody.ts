import type { AutogestionModuleName } from '../../../../Shared/tracking/AutogestionModuleName.js';

export interface TrackAutogestionInteractionBody {
  moduleName: AutogestionModuleName;
  clientFlowId: number;
  occurredAt?: string | undefined;
}
