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
      path: '/book/:id',
      name: 'BookDetail',
      component: SelectedBook,
      props: true,
    },
  ],
})

export default router
