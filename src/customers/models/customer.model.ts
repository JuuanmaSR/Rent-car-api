import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'Customers',
})
export class Customer extends Model {
  @Column({ primaryKey: true, autoIncrement: true, unique: true })
  id: number;

  @Column({ allowNull: false })
  firstName: string;

  @Column({ allowNull: false })
  lastName: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  documentType: string;

  @Column({ allowNull: false, unique: true })
  document: string;

  @Column({ allowNull: false })
  phoneNumber: string;

  @Column({ allowNull: false })
  address: string;

  @Column({ allowNull: false })
  dateOfBirth: string;

  @Column({ allowNull: false })
  nationality: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
