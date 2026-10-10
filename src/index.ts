import 'reflect-metadata';
import { buildApp } from './app/BuildApp.js';
import { Server } from './app/Server.js';

import { SequelizeHealthCheck } from './infrastructure/database/sequelize/SequelizeHealthCheck.js';
import { sequelize } from './infrastructure/database/sequelize/SequelizeClient.js';

const app = buildApp();

const sequelizeHealthCheck = new SequelizeHealthCheck(sequelize);

const server = new Server(app, sequelizeHealthCheck);

server.registerShutdownSignals();

await server.start();
