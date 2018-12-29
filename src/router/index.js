import Vue from 'vue'
import Router from 'vue-router'
import foodList from '../views/FoodList'
import selfPage from '../views/SelfPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/foodlist'
    },
    {
      path: '/foodlist',
      component: foodList
    },
    {
      path: '/selfpage',
      component: selfPage
    }
  ]
})
