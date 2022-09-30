import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import DetailsView from '../views/DetailsView/DetailsView.vue';
import AddingView from '../views/AddingView/AddingView.vue'

const routes = [
  {
    path: '/',
    redirect: '/todos',
  },
  {
    path: '/todos',
    name: 'todos',
    component: HomeView
  },
  {
    path: '/todos/:id',
    component: DetailsView
  },
  {
    path: '/adding',
    name: 'adding',
    component: AddingView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
