import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home/index.vue'

const xxtd = r =>
  require.ensure([], () => r(require('@/view/xxtd/index.vue')), 'xxtd')
const homepage = r =>
  require.ensure([], () => r(require('@/view/homepage/index.vue')), 'homepage')

import article from '@/view/Article/index.vue'
import tags from '@/view/tags/tags.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: home,
      children: [
        {
          path: '/xxtd',
          name: 'xxtd',
          component: xxtd
        },
        {
          path: '/homepage',
          name: 'homepage',
          component: homepage
        },
        {
          path: '/article',
          name: 'Article',
          component: article
        }
      ]
    },
    {
      path: '/tags',
      name: 'Tags',
      component: tags
    },

    {
      path: '*',
      redirect: '/homepage'
    }
  ]
})
