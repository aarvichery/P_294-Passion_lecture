import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SelectedBook from '../views/SelectedBook.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/allbooks',
      name: 'allbooks',
      component: () => import('../views/AllBooks.vue'),
    },
    {
      path: '/mybooks',
      name: 'mybooks',
      component: () => import('../views/MyBooks.vue'),
    },
    {
      path: '/addbooks',
      name: 'addbooks',
      component: () => import('../views/AddBooks.vue'),
    },
    {
      //Provisoire pour tester dans le futur popup directement dans les views.
      path: '/signup',
      name: 'signup',
      component: () => import('../views/signupPage.vue'),
    },
    {
      path: '/book/:id',
      name: 'BookDetail',
      component: SelectedBook,
      props: true,
    },
    {
      path: '/books/:id/addcomment',
      name: 'addComment',
      component: () => import('../views/addComment.vue'),
      props: true,
    },
    {
      path: '/addauthor',
      name: 'addAuthor',
      component: () => import('../views/addAuthor.vue'),
    },
    {
      path: '/book/:id/editbook',
      name: 'editbook',
      component: () => import('../views/EditBooks.vue'),
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginPage.vue'),
    },
    {
      path: '/user/:id',
      name: 'showUser',
      component: () => import('../views/showUser.vue'),
      props: true,
    },
  ],
})

export default router
