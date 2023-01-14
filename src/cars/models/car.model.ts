import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'Cars',
})
export class Car extends Model {
  @Column({ primaryKey: true, autoIncrement: true, unique: true })
  id: number;

  @Column({ allowNull: false })
  model: string;

  @Column({ allowNull: false })
  brand: string;

  @Column({ allowNull: false })
  year: number;

  @Column({ allowNull: false })
  kilometers: number;

  @Column({ allowNull: false })
  color: string;

  @Column({ allowNull: false })
  airConditioner: boolean;

  @Column({ allowNull: false })
  gearbox: string;

  @Column({ allowNull: false })
  dailyPrice: number;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
