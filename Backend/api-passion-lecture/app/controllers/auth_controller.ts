// import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
     /**
       * Display a list of resource
       */
      async register({}: HttpContext) {}
    
      /**
       * Display form to create a new record
       */
      async login({}: HttpContext) {}
    
      /**
       * Handle form submission for the create action
       */
      async logout({ request }: HttpContext) {}
}