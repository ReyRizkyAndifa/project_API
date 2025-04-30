import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Bus from './bus.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare harga: string

  @column()
  declare busId: number

  @column()
  declare penumpang: string // ✅ properti tambahan

  @column.date()
  declare tanggal: DateTime // ✅ properti tambahan

  @belongsTo(() => Bus)
  declare bus: BelongsTo<typeof Bus>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
