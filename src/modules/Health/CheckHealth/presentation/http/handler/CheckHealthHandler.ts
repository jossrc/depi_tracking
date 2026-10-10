import type { CheckHealth } from '../../../application/CheckHealth.js';
import type { CheckHealthResponse } from '../response/CheckHealthResponse.js';

export class CheckHealthHandler {
  constructor(private readonly checkHealth: CheckHealth) {}

  readonly handle = async (): Promise<CheckHealthResponse> => {
    const result = this.checkHealth.execute();

    return {
      status: result.status,
      timestamp: result.timestamp.toISOString(),
      version: result.version,
    };
  };
}
