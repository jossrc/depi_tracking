import { ValidationException } from '../../../../shared/errors/validation/ValidationException.js';
import type { AutogestionModuleName } from './AutogestionModuleName.js';
import type { AutogestionTimestampField } from './AutogestionTimestampField.js';

const moduleTimestampField: Record<
  AutogestionModuleName,
  AutogestionTimestampField
> = {
  appointments: 'lastReservationStartedAt',
  'purchase-zones': 'lastCartReachedAt',
  'confirm-reservation': 'lastPayPopupOpenedAt',
};

export function resolveAutogestionTimestampField(
  moduleName: AutogestionModuleName,
): AutogestionTimestampField {
  const field = moduleTimestampField[moduleName];

  if (!field) {
    throw new ValidationException({
      code: 'UNKNOWN_AUTOGESTION_MODULE',
      message: 'moduleName no es un módulo de autogestión válido',
      errors: [
        {
          field: 'moduleName',
          code: 'UNKNOWN_MODULE',
          message: 'moduleName no es un módulo de autogestión válido',
          source: 'application',
        },
      ],
    });
  }

  return field;
}
