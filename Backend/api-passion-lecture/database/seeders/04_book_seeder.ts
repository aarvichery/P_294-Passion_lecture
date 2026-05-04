import Book from '#models/book'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Book.createMany([
      {
        id: 1,
        title: '123 soleil',
        nbPage: 352,
        extract: 'https://www.renaud-bray.com/livres-jeunesse-123soleil',
        resume: 'Le livre parle du jeu 123 soleil',
        editor: 'editorSoleil',
        editionYear: 2015,
        userId: 1,
        categoryId: 1,
        authorId: 1
      }
    ])
  }
}