import { DataType, Column, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'api_keys',
  underscored: true,
  timestamps: true,
  paranoid: true,
})
export class ApiKey extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  api_key_hash!: string

  @Column(DataType.JSONB)
  scopes?: Record<string, unknown>

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: {},
  })
  metadata!: Record<string, unknown>
}
