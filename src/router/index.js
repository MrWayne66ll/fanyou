import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import outList from '../views/OutList'

export default new Router({
  routes: [
    {
      path: '/outlist',
      component: outList
    },
  ]
})
