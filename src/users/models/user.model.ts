import {
  Column,
  Model,
  Table,
  DeletedAt,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'Users',
})
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, unique: true })
  id: number;

  @Column({ allowNull: false })
  username: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}
