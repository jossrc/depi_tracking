import 'reflect-metadata';
import type { ModelCtor } from 'sequelize-typescript';
import { AutogestionInteractionModel } from '../../../modules/Autogestion/Shared/persistence/sequelize/models/AutogestionInteractionModel.js';

export const sequelizeSyncModels: ModelCtor[] = [
  AutogestionInteractionModel,
];

export const sequelizeRuntimeModels: ModelCtor[] = [
  AutogestionInteractionModel,
];

export const sequelizeModels: ModelCtor[] = [
  ...sequelizeSyncModels,
  ...sequelizeRuntimeModels,
];
