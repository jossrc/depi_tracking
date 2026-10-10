import { Environment } from '../../../config/environment/Environment.js';
import { logger } from '../../logging/Logger.js';
import { logSequelizeSyncSql } from './SequelizeLogging.js';
import { sequelizeSyncModels } from './SequelizeModels.js';

export async function syncSequelizeModels(): Promise<void> {
  if (!Environment.DATABASE_SYNC_ALTER) {
    logger.info(
      'Sincronización Sequelize omitida (DATABASE_SYNC_ALTER=false)',
    );
    return;
  }

  if (sequelizeSyncModels.length === 0) {
    logger.info('No hay modelos Sequelize para sincronizar');
    return;
  }

  logger.info(
    {
      models: sequelizeSyncModels.map((model) => model.name),
    },
    'Sincronizando modelos Sequelize con alter: true',
  );

  for (const model of sequelizeSyncModels) {
    await model.sync({
      alter: true,
      logging: logSequelizeSyncSql,
    });
  }

  logger.info('Sincronización de modelos Sequelize completada');
}
