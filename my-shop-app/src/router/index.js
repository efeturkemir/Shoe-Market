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
      // meta: { requiresAuth: true } // Optional: Comment or remove this line
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import('../views/ShopcartView.vue'),
      // meta: { requiresAuth: true }
    },
    {
      path: "/products/:productId",
      name: "Product",
      component: () => import('../views/ProductView.vue'),
      // meta: { requiresAuth: true }
    },
  ]
})

// Temporarily disable authentication check
router.beforeEach((to, from, next) => {
  // Allow access to all routes without checking authentication
  next()
})

export default router
