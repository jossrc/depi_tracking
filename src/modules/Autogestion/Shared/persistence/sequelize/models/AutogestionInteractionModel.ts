import 'reflect-metadata';
import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'autogestion_interaction_tracking',
  timestamps: false,
})
export class AutogestionInteractionModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: false,
  })
  declare flowClientId: number;

  @AllowNull(true)
  @Column(DataType.DATE)
  declare lastReservationStartedAt: Date | null;

  @AllowNull(true)
  @Column(DataType.DATE)
  declare lastPayPopupOpenedAt: Date | null;

  @AllowNull(true)
  @Column(DataType.DATE)
  declare lastCartReachedAt: Date | null;
}
