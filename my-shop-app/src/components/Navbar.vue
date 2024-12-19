<script setup>
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";
import { useProductStore } from "../stores/ProductsStore";
import { useAuthStore } from "../stores/AuthStore";
const auth = useAuthStore();
const store = useProductStore();

const cartItem = computed(() => {
  return store.productsOnCart.length > 0 ? true : false;
});
let mobileMenu = ref(false);
</script>

<template>
  <!-- component -->
  <!-- Header -->
  <div class="sticky top-0 z-10 bg-gray-900 shadow-lg">
    <div class="container mx-auto px-6 py-4">
      <nav class="flex justify-between items-center text-white">
        <!-- Logo Section -->
        <div class="flex items-center">
          <router-link
            to="/"
            class="text-2xl font-extrabold tracking-wide text-blue-400 hover:text-blue-300 md:text-3xl"
          >
            Shoe Market
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <div @click="mobileMenu = !mobileMenu" class="md:hidden">
          <button
            type="button"
            class="focus:outline-none hover:text-gray-400 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <!-- Menu Links -->
        <ul
          :class="mobileMenu ? 'flex' : 'hidden'"
          class="md:flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 mt-4 md:mt-0"
        >
          <li>
            <RouterLink
              to="/"
              class="text-sm font-bold hover:text-blue-400 transition duration-300"
            >
              Home
            </RouterLink>
          </li>
          <li>
            <a
              href="#"
              class="text-sm font-bold hover:text-blue-400 transition duration-300"
            >
              Contact Us
            </a>
          </li>
          <li>
            <RouterLink
              to="/cart"
              class="relative flex items-center text-sm font-bold hover:text-blue-400 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Cart
              <span
                v-if="cartItem"
                class="absolute top-0 right-0 flex h-3 w-3 -mt-1 -mr-2"
              >
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex h-3 w-3 rounded-full bg-pink-500"
                ></span>
              </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="#"
              class="flex items-center text-sm font-bold hover:text-blue-400 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Wishlist
            </RouterLink>
          </li>
          <li
            @click="auth.logout()"
            class="cursor-pointer text-sm font-bold hover:text-blue-400 transition duration-300"
          >
            Logout
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
