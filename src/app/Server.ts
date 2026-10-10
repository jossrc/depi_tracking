import type { FastifyInstance } from 'fastify';

import { Environment } from '../config/environment/Environment.js';
import type { SequelizeHealthCheck } from '../infrastructure/database/sequelize/SequelizeHealthCheck.js';
import { sequelize } from '../infrastructure/database/sequelize/SequelizeClient.js';
import { syncSequelizeModels } from '../infrastructure/database/sequelize/SyncSequelizeModels.js';
import { logger } from '../infrastructure/logging/Logger.js';

export class Server {
  private isShuttingDown = false;

  constructor(
    private readonly app: FastifyInstance,
    private readonly sequelizeHealthCheck: SequelizeHealthCheck,
  ) {}

  async start(): Promise<void> {
    try {
      await this.sequelizeHealthCheck.check();

      logger.info('Conexión a MariaDB verificada');

      await syncSequelizeModels();

      const address = await this.app.listen({
        host: Environment.HOST,
        port: Environment.PORT,
      });

      logger.info(
        {
          address,
          environment: Environment.NODE_ENV,
        },
        'Servidor iniciado',
      );
    } catch (error) {
      logger.fatal(
        {
          err: error,
        },
        'Error al iniciar el servidor',
      );

      await this.stop(1);
    }
  }

  async stop(exitCode = 0): Promise<void> {
    if (this.isShuttingDown) {
      return;
    }

    this.isShuttingDown = true;

    logger.info('Cierre del servidor iniciado');

    try {
      await this.app.close();
      await sequelize.close();

      logger.info('Cierre del servidor completado');
    } catch (error) {
      logger.error(
        {
          err: error,
        },
        'Error al cerrar el servidor',
      );

      exitCode = 1;
    }

    process.exitCode = exitCode;
  }

  registerShutdownSignals(): void {
    process.once('SIGINT', () => void this.stop());

    process.once('SIGTERM', () => void this.stop());
  }
}
