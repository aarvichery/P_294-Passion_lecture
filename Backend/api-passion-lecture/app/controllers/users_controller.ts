import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const users = await User.query().orderBy('id')
    return users;
  }

  /**
   * Show individual record
   
  async show({ params }: HttpContext) {}
  */

  /**
   * Handle form submission for the edit action
   
  async update({ params, request }: HttpContext) {}
  */

  /**
   * Delete record
   
  async destroy({ params }: HttpContext) {}
  */
}