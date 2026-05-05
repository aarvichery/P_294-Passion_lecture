import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { bookValidator } from '#validators/book'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const books = await Book.query().preload('author').preload('category').preload('user').orderBy('id')
    return books
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const {title, nbPage, extract, resume, editor, editionYear, userId, categoryId, authorId} = await request.validateUsing(bookValidator)
    const book = await Book.create({title, nbPage, extract, resume, editor, editionYear, userId, categoryId, authorId})
    return response.created(book)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const book = await Book.query().preload('author').preload('category').preload('user').where('id', params.id).firstOrFail()
    return book
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const {title, nbPage, extract, resume, editor, editionYear, userId, categoryId, authorId} = await request.validateUsing(bookValidator)
    const book = await Book.findOrFail(params.id)
    book.merge({title, nbPage, extract, resume, editor, editionYear, userId, categoryId, authorId})
    await book.save()
    return book
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    return book.delete()
  }
}