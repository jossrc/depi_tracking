import { ValidationException } from '../../../../../../shared/errors/validation/ValidationException.js';

const isoInstantPattern =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})$/;

function invalidOccurredAt(): never {
  throw new ValidationException({
    code: 'INVALID_OCCURRED_AT',
    message: 'occurredAt debe ser una fecha ISO 8601 con zona horaria',
    errors: [
      {
        field: 'occurredAt',
        code: 'INVALID_DATETIME',
        message:
          'Usa ISO 8601 con Z u offset, por ejemplo 2026-09-02T22:49:00.000Z o 2026-09-02T17:49:00-05:00',
        source: 'body',
      },
    ],
  });
}

export function parseOccurredAt(value: string | undefined): Date | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!isoInstantPattern.test(value)) {
    invalidOccurredAt();
  }

  const occurredAt = new Date(value);

  if (Number.isNaN(occurredAt.getTime())) {
    invalidOccurredAt();
  }

  return occurredAt;
}
