import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import('../views/LoginView.vue')
    },
    {
      path: "/register",
      name: "Register",
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: "/",
      name: "Home",
      component: () => import('../views/HomeView.vue'),
      meta:{
      requiresAuth: true
      }
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import('../views/ShopcartView.vue'),
      meta:{
      requiresAuth: true
      }
    },
    {
      path: "/products/:productId",
      name: "Product",
      component: () => import('../views/ProductView.vue'),
      meta:{
      requiresAuth: true
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  


  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    if (!token) {
      // no token, redirect to login page
      next({ name: 'Login' })
    } else {
      // token exists, allow access to the route
     next()
    }
  } else {
    // this route does not require auth, allow access to all
    next()
  }
})


export default router
