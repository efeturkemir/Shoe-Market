<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/AuthStore';
const store = useAuthStore();
let username = ref('')
let password = ref('')
let confirmPassword = ref('')
</script>

<template>
  <div class="bg-gray-200 min-h-screen flex items-center justify-center">
    <div class="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-white">Register</h2>
      <form @submit.prevent="store.register(username, password, confirmPassword)">
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="username">Username</label>
          <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="username" v-model="username" required>
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="password">Password</label>
          <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" v-model="password" required>
        </div>
        <div class="mb-6">
          <label class="block text-white font-bold mb-2" for="confirm-password">Confirm Password</label>
          <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="confirm-password" v-model="confirmPassword" required>
        </div>
        <button class="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
      </form>
      <p class="mt-4 text-white">Already have an account? <RouterLink to="/login" class="underline hover:text-gray-400">Login here</RouterLink></p>
    </div>
  </div>
  <div :class="store.error ? 'scale-100' : ''" class=" fixed scale-0 z-10 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
    <!-- Overlay background -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
    <!-- Modal content -->
    <div :class="store.error ? 'scale-100' : ''" class="transform scale-0 transition-transform duration-300 relative z-10 w-full  max-w-md p-6 bg-white rounded-lg shadow-lg">
      <!-- Icon -->
      <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-red-500 bg-red-100 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10" />
  <line x1="15" y1="9" x2="9" y2="15" />
  <line x1="9" y1="9" x2="15" y2="15" />
</svg>

      </div>
      <!-- Message -->
      <p class="text-lg font-medium text-gray-800">{{store.message}}!</p>
      <!-- Button -->
      <div class="mt-6">
        <button  class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500">
         <RouterLink @click="store.error = !store.error, username = '', password = '', confirmPassword = ''" to="/register">Try again</RouterLink> 
        </button>
      </div>
    </div>
  </div>
</div>
</template>
