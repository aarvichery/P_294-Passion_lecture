import Author from '#models/author'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthorsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const authors = await Author.query().orderBy('id')
    return authors;
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    /* 
    AJOUTER LE VALIDATOR APRES LE MERGE
    const {name, firstname} = await request.validateUsing()
    
   const author = await Author.create({name, firstname})
   return response.created(author)
   */
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const author = await Author.query().where('id', params.id).firstOrFail()
    return author;
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    // A FAIRE APRES
    // const {name, firstname} = request.validateUsing()
    // const author = await Author.findOrFail(params.id)
    // author.merge({name, firstname})
    // await author.save()
    // return author
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const author = await Author.findOrFail(params.id)
    return author.delete()
  }
}