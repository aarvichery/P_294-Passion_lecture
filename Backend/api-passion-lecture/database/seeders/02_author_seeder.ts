import Author from '#models/author'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Author.createMany([
      {
        id: 1,
        name: 'Vichery',
        firstname: 'Aaron'
      }
    ])
  }
}