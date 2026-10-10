import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript';
import { Environment } from '../../../config/environment/Environment.js';
import { logSequelizeSql } from './SequelizeLogging.js';
import { sequelizeModels } from './SequelizeModels.js';

export const sequelize = new Sequelize(
  Environment.DB_NAME_MYSQL,
  Environment.DB_USER_MYSQL,
  Environment.DB_PASS_MYSQL,
  {
    host: Environment.DB_HOST_MYSQL,
    port: Environment.DB_PORT_MYSQL,
    dialect: 'mysql',
    logging: Environment.DATABASE_LOGGING ? logSequelizeSql : false,
    pool: {
      max: Environment.DATABASE_POOL_MAX,
      min: 0,
      acquire: Environment.DATABASE_CONNECTION_TIMEOUT_MS,
      idle: Environment.DATABASE_IDLE_TIMEOUT_MS,
    },
    define: {
      freezeTableName: true,
      underscored: true,
    },
    dialectOptions: {
      connectTimeout: Environment.DATABASE_CONNECTION_TIMEOUT_MS,
    },
    models: sequelizeModels,
  },
);
