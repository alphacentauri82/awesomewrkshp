import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PageNotFound from '@/components/PageNotFound'
import HomeDetail from '@/components/HomeDetail'
import Main from '@/components/Main'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: false },
      children: [
        {
          path: '/',
          name: 'Main',
          component: Main,
          meta: { requiresAuth: false }
        },
        {
          path: 'HomeDetail/:id',
          name: 'HomeDetail',
          component: HomeDetail,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ],
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 }),
  linkActiveClass: 'is-active'
})

router.beforeEach((to, from, next) => {
  const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
  console.log(authUser)
  if (to.meta.requiresAuth) {
    if (authUser) {
      next()
    } else {
      next({ name: 'Main' })
    }
  } else {
    next()
  }
})

export default router
