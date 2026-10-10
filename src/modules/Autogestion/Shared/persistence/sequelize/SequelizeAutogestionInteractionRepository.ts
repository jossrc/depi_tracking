import { DatabaseException } from '../../../../../infrastructure/database/errors/DatabaseException.js';
import type {
  AutogestionInteractionRepository,
  UpsertAutogestionInteractionTimestamp,
} from '../AutogestionInteractionRepository.js';
import { AutogestionInteractionModel } from './models/AutogestionInteractionModel.js';

function isTableMissingError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const msg = error.message.toLowerCase();
  return (
    msg.includes("doesn't exist") ||
    msg.includes('no such table') ||
    msg.includes('er_no_such_table')
  );
}

export class SequelizeAutogestionInteractionRepository
  implements AutogestionInteractionRepository
{
  async upsertTimestamp(
    input: UpsertAutogestionInteractionTimestamp,
  ): Promise<void> {
    try {
      await AutogestionInteractionModel.upsert({
        flowClientId: input.flowClientId,
        [input.field]: input.occurredAt,
      });
    } catch (error) {
      const message = isTableMissingError(error)
        ? "La tabla 'autogestion_interaction_tracking' no existe en la base de datos. Activa DATABASE_SYNC_ALTER=true para crearla."
        : 'Error al guardar la interacción de autogestión';

      throw new DatabaseException({
        message,
        metadata: { operation: 'UpsertAutogestionInteraction' },
        cause: error,
      });
    }
  }
}
