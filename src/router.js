import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const onlyAuthUser = async (to, from, next) => {
  if(localStorage.getItem("adToken") && localStorage.getItem("adId")) {
    if(store.state.adminData) {
      next()
    }else{
      next("/auth")
    }
  } else {
    next("/auth")
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "auth" */ './views/Auth.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: onlyAuthUser,
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
    },
    {
      path: '/qrcode/:poId',
      name: 'qrcode',
      component: () => import(/* webpackChunkName: "qrcode" */ './views/QRcode.vue'),
      props: true,
    },
  ]
})