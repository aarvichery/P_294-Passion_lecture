/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import UsersController from '#controllers/users_controller'
// Swagger

import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

//controllers
const BooksController = () => import('#controllers/books_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const AuthorsController = () => import('#controllers/authors_controller')
const CommentsController = () => import('#controllers/comments_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .resource('books', BooksController)
      .apiOnly()
      .use(['store', 'update', 'destroy'], middleware.auth())
    router.group(() => {
      router.get('categories', [CategoriesController, 'index'])
      router.get('categories/:id', [CategoriesController, 'show'])
    })
    router
      .group(() => {
        router.get('authors/:id', [AuthorsController, 'show'])
        router.post('authors/', [AuthorsController, 'store'])
        router.put('authors/:id', [AuthorsController, 'update'])
        router.delete('authors/:id', [AuthorsController, 'destroy'])
      })
      .use(middleware.auth())
    router.get('authors', [AuthorsController, 'index'])
    router
      .group(() => {
        router.get('comments', [CommentsController, 'index'])
        router.get('comments/:id', [CommentsController, 'show'])
        router.post('comments', [CommentsController, 'store'])
        router.put('comments/:id', [CommentsController, 'update'])
        router.delete('comments/:id', [CommentsController, 'destroy'])
      })
      .prefix('books/:book_id')
      .use(middleware.auth())
    router.get('comments', [CommentsController, 'index'])
    router.get('users', [UsersController, 'index'])
    router.get('users/:id', [UsersController, 'show'])
    router
      .group(() => {
        router.get('books', [BooksController, 'index'])
        router.get('books/:book_id', [BooksController, 'show'])
      })
      .prefix('users/:user_id')

    router
      .group(() => {
        router.post('register', [AuthController, 'register'])
        router.post('login', [AuthController, 'login'])
        router.post('logout', [AuthController, 'logout']).use(middleware.auth())
      })
      .prefix('users')




  })
  .prefix('v1/api')

//Swagger````````
 router.get('swagger', async () => {
 return AutoSwagger.default.docs(router.toJSON(), swagger)
})
// Renders Swagger-UI and passes YAML-output of /swagger
router.get('v1/api/docs', async () => {
 return AutoSwagger.default.ui('/swagger', swagger)
})