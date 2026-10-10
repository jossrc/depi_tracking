import type { FastifySchema } from 'fastify';
import { ErrorResponseSchema } from '../../../../../../app/http/errors/ErrorResponseSchema.js';
import { autogestionModuleNames } from '../../../../Shared/tracking/AutogestionModuleName.js';

export const TrackAutogestionInteractionSchema = {
  headers: {
    type: 'object',
    additionalProperties: true,
    required: ['x-api-key'],
    properties: {
      'x-api-key': { type: 'string', minLength: 1 },
    },
  },
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['moduleName', 'clientFlowId'],
    properties: {
      moduleName: {
        type: 'string',
        enum: [...autogestionModuleNames],
      },
      clientFlowId: { type: 'integer', exclusiveMinimum: 0 },
      occurredAt: {
        type: 'string',
        minLength: 20,
        maxLength: 35,
        pattern:
          '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[+-]\\d{2}:?\\d{2})$',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      additionalProperties: false,
      required: ['ok'],
      properties: {
        ok: { type: 'boolean', enum: [true] },
      },
    },
    400: ErrorResponseSchema,
    401: ErrorResponseSchema,
    503: ErrorResponseSchema,
  },
} as const satisfies FastifySchema;
