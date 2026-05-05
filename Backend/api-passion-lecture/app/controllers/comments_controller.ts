import Comment from '#models/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const comments = await Comment.query().preload('user').preload('book').orderBy('id')
    return comments
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    // A FAIRE AVEC LES VALIDATEURS
    // const {text, appreciation, userId, bookId} = await request.validateUsing()
    // const comment = await Comment.create({text, appreciation, userId, bookId})
    // return comment
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const comment = await Comment.query().preload('user').preload('book').where('id', params.id).firstOrFail()
    return comment
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    // A FAIRE AVEC LES VALIDATEURS
    // const {text, appreciation, userId, bookId} = await request.validateUsing()
    // const comment = await Comment.findOrFail(params.id)
    // comment.merge({text, appreciation, userId, bookId})
    // await comment.save()
    // return comment
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)
    return comment.delete()
  }
}