import fastify, { type FastifyBaseLogger, type FastifyInstance } from 'fastify';
import { registerModules } from './RegisterModules.js';
import { logger } from '../infrastructure/logging/Logger.js';
import { randomUUID } from 'node:crypto';
import { registerErrorHandler } from './http/errors/RegisterErrorHandler.js';
import type { ExceptionReporter } from './http/errors/reporting/ExceptionReporter.js';

export interface BuildAppOptions {
  exceptionReporters?: readonly ExceptionReporter[];
}

export function buildApp(options: BuildAppOptions = {}): FastifyInstance {
  const app = fastify({
    loggerInstance: logger as FastifyBaseLogger,
    genReqId: () => randomUUID(),
    ajv: {
      customOptions: {
        allErrors: true,
        removeAdditional: false,
      },
    },
  });

  registerErrorHandler(app, { reporters: options.exceptionReporters });
  registerModules(app);

  return app;
}
