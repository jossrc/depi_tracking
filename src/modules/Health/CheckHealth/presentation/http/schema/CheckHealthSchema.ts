import type { FastifySchema } from 'fastify';

export const CheckHealthSchema = {
  response: {
    200: {
      type: 'object',
      additionalProperties: false,
      required: ['status', 'timestamp', 'version'],
      properties: {
        status: { type: 'string', enum: ['ok'] },
        timestamp: { type: 'string', format: 'date-time' },
        version: { type: 'string' },
      },
    },
  },
} as const satisfies FastifySchema;
