<script setup>
import { RouterLink } from 'vue-router';
import {  ref, computed } from 'vue';
import { useProductStore } from '../stores/ProductsStore';
import { useAuthStore } from '../stores/AuthStore';
const auth = useAuthStore()
const store = useProductStore()

const cartItem = computed(() => {
  return store.productsOnCart.length > 0 ? true : false
})
  let mobileMenu = ref(false)
  

</script>

<template>
  <!-- component -->
  <!-- Header -->
  <div class="sticky top-0 z-10">
    <div class="bg-gray-900">
      <nav class="
         
          container
          px-6
          py-8
          mx-auto
          md:flex md:justify-between md:items-center
          text-white
        ">
        <div class="flex items-center justify-between">
          <router-link to="/" class="
              text-xl
              font-bold
              text-white
              md:text-2xl
              hover:text-blue-400
            ">Shoe Market
          </router-link>
          <!-- Mobile menu button -->
          <div @click="mobileMenu = !mobileMenu" class="flex md:hidden">
            <button type="button" class="
                text-white
                hover:text-gray-400
                focus:outline-none focus:text-gray-400
              ">
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                </path>
              </svg>
            </button>
          </div>
        </div>


        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <ul :class="mobileMenu ? 'flex' : 'hidden'" class="
            flex-col
            mt-8
            space-y-4
            md:flex
            md:space-y-0
            md:flex-row
            md:items-center
            md:space-x-10
            md:mt-0
            
          ">
          <li class="text-sm font-bold text-white hover:text-blue-400">
            <RouterLink to="/">Home</RouterLink>
          </li>
         
          <li class="text-sm font-bold text-white hover:text-blue-400">
            <a href="#">Contact Us</a>
          </li>
          
          <RouterLink to="/cart" class="flex"> <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 mt-1 h-6 w-6 flex items-center" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg><span v-if="cartItem" class="flex absolute -mt-1 ml-4">
              <span  class=" animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span class=" relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                  
                </span>
              </span></RouterLink>
              <RouterLink to="/" class="hover:text-gray-200 flex" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 mt-1 h-6 w-6 flex items-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </RouterLink>
            <li @click="auth.logout()" class="text-sm font-bold text-white hover:text-blue-400 cursor-pointer">
            Logout
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>