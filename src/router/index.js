import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {
    }, () => {
    })
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {
    }, () => {
    })
  }
}


let router = new VueRouter({
  routes: [
    //  重定向
    {
      path: '*',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('@/pages/Home'),
      meta: {hasFooter: true, showTypeNav: true},
    },
    {
      path: '/login',
      component: () => import('@/pages/Login')
    },
    {
      path: '/shopCart',
      component: () => import('@/pages/ShopCart'),
    },
    {
      path: '/addCartSuccess',
      name: 'addCartSuccessName',
      component: () => import('@/pages/AddCartSuccess'),
    },
    {
      path: '/register',
      component: () => import('@/pages/Register'),
    },
    {
      name: 'searchName',
      path: '/search/:keyWord?',
      component: () => import('@/pages/Search'),
      meta: {hasFooter: true}
    },
    {
      path: '/detail/:skuid',
      component: () => import('@/pages/Detail'),
    },
    {
      path: '/trade',
      component: () => import('@/pages/Trade'),
      meta: {needLogin: true},
      beforeEnter: (to, from, next) => {
        if (from.path == '/shopcart') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/pay',
      component: () => import('@/pages/Pay'),
      meta: {needLogin: true},
      beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/paysuccess',
      component: () => import('@/pages/PaySuccess'),
      meta: {needLogin: true},
      beforeEnter: (to, from, next) => {
        if (from.path == '/pay') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/center',
      component: () => import('@/pages/Center'),
      children: [
        {path: 'myorder', component: () => import('@/pages/Center/MyOrder')},
        {path: 'grouporder', component: () => import('@/pages/Center/GroupOrder')}
      ],
      redirect: '/center/myorder'
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return {y: 0}
  }
})

//前置守卫
router.beforeEach((to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    if (to.path == '/login') {
      next('/')
    } else {
      if (name) next()
      //  防止刷新丢失信息
      else {
        store.dispatch('user/getUserInfo').then((res) => {
          next()
        }).catch((error) => {
          alert(error.message)
          //错误登出
          store.dispatch('user/userLogout')
          next('/login')
        })
      }
    }
  } else {
    if (to.meta.needLogin) {
      next('/login')
    } else if (to.path.indexOf('/center') != -1) {
      next('/login?redirect=' + to.path)
    } else
      next()
  }
})

export default router