import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;

  @ApiProperty()
  @CreatedAt
  createdAt: Date;

  @ApiProperty()
  @UpdatedAt
  updatedAt: Date;
}