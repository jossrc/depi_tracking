import type { CheckHealthResult } from './result/CheckHealthResult.js';

export class CheckHealth {
  constructor(private readonly version: string) {}

  execute(): CheckHealthResult {
    return {
      status: 'ok',
      timestamp: new Date(),
      version: this.version,
    };
  }
}
