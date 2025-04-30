import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tickets'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('penumpang')
      table.date('tanggal')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('penumpang')
      table.dropColumn('tanggal')
    })
  }
}
