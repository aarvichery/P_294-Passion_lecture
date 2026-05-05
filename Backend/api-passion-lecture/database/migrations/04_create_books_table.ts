import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').unique().notNullable()
      table.integer('nb_page').notNullable()
      table.string('extract').notNullable()
      table.string('resume').notNullable()
      table.string('editor').notNullable()
      table.integer('edition_year').notNullable()
      // table.image('image')

      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('category_id').notNullable().unsigned().references('id').inTable('categories').onDelete('CASCADE')
      table.integer('author_id').notNullable().unsigned().references('id').inTable('authors').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}