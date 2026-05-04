import Comment from '#models/comment'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Comment.createMany([
      {
        id: 1,
        text: 'Nul',
        appreciation: 3,
        userId: 1,
        bookId: 1
      }
    ])
  }
}