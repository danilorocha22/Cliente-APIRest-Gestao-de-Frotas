import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: () => import(/* webpackChunkName: "about" */ '../views/Sobre.vue')
  },
  {
    path: '/condutores',
    name: "Condutores",
    component: () => import(/* webpackChunkName: "condutor" */ '../views/Condutores.vue')
  },
  {
    path: '/veiculos',
    name: "Veiculos",
    component: () => import(/* webpackChunkName: "veiculo" */ '../views/Veiculos.vue')
  },
  {
    path: '/ordenstrafego',
    name: "OrdensTrafego",
    component: () => import(/* webpackChunkName: "ordensDeTrafego" */ '../views/OrdensTrafego.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
