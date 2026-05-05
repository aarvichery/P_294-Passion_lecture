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
    router.resource('books', BooksController).apiOnly()
    router.group(() => {
      router.get('categories', [CategoriesController, 'index'])
      router.get('categories/:id', [CategoriesController, 'show'])
    })
    router.resource('authors', AuthorsController).apiOnly()
    router
      .group(() => {
        router.resource('comments', CommentsController).apiOnly()
      }).prefix("books/:book_id")


    router 
      .group(() => { 
    router.post('register', [AuthController, 'register']) 
    router.post('login', [AuthController, 'login']) 
    router.post('logout', [AuthController, 'logout']) // .use(middleware.auth()) 
  }) 
  .prefix('user') 
  })
  .prefix('v1/api')