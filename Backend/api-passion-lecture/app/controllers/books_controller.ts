import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { BookValidator } from '#validators/bookValidator.js'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const books = await Book.query().preload('author').preload('category')
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}