import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const categories = await Category.query().orderBy('id')
    return categories;
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const category = await Category.query().where('id', params.id).firstOrFail()
    return category;
  }

}