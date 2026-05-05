// import type { HttpContext } from '@adonisjs/core/http'

// Infos trouvées sur le site https://medium.com/@maximemrf/authentification-avec-adonisjs-v6-et-access-token-oat-83c97387a39b

import User from "#models/user"

export default class AuthController {
     /**
       * Display a list of resource
       */
      async register({response}: HttpContext) {
        // A FAIRE AVEC LES VALIDATEURS
        // const payload = await request.validateUsing()
        // const user = await User.create(payload)
        // return response.created(user)
      }
    
      /**
       * Display form to create a new record
       */
      async login({ request, response }: HttpContext) {
        // A FAIRE AVEC LES VALIDATEURS
        // const { email, password } = await request.validateUsing()
        // const user = await User.verifyCredentials(email, password)
        // const token = await User.accessTokens.create(user)
        // return response.ok({
        //   token: token,
        //   ...user.serialize(),
        // })
      }
    
      /**
       * Handle form submission for the create action
       */
      async logout({ auth, response }: HttpContext) {
        // A FAIRE AVEC LE VALIDATEUR
        // const user = auth.getUserOrFail()
        // const token = auth.user?.currentAccessToken.identifier
        // if(!token) {
        //   return response.badRequest({ message: 'Token not found' })
        // }
        // await User.accessTokens.delete(user, token)
        // return response.ok({ message: 'Logged out' })
      }
}