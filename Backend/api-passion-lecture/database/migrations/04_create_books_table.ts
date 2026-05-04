import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('titre').unique().notNullable()
      table.integer('nbPage').notNullable()
      table.string('extract').notNullable()
      table.string('resumeBook').notNullable()
      table.string('editor').notNullable()
      table.integer('anneeEdition').notNullable()
      // table.image('image')

      table.integer('user_fk').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('category_fk').notNullable().unsigned().references('id').inTable('categories').onDelete('CASCADE')
      table.integer('authors_fk').notNullable().unsigned().references('id').inTable('authors').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}