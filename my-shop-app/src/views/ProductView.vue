<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../components/Navbar.vue";
import { useProductStore } from "../stores/ProductsStore";
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/AuthStore";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
let addProduct = ref(false);
let comment = ref("");
const store = useProductStore();

const route = useRoute();
const productId = route.params.productId;
const selectedProduct = store.products.filter(
  (element) => element._id === productId
);

console.log(productId);
store.getComments(productId);
const authStore = useAuthStore();
async function addComment() {
  try {
    const URL = `${API_URL}/products/${productId}/comments`;
    const response = await axios.post(URL, {
      comment: comment.value,
      username: authStore.user.username,
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  } finally {
    comment.value = "";
    await store.getComments(productId);
  }
}

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // This enables smooth scrolling
  });
});
</script>
<template v-if="selectedProduct">
  <Navbar></Navbar>
  <div class="container mx-auto px-4 py-8">
    <div class="lg:flex">
      <!-- Shoe Image -->
      <div class="lg:w-1/2">
        <img
          :src="selectedProduct[0].productImage"
          alt="Shoe"
          class="w-full h-auto object-contain"
        />
      </div>

      <!-- Shoe Details -->
      <div class="lg:w-1/2 lg:pl-8">
        <h1 class="text-2xl font-bold mb-4">
          {{ selectedProduct[0].productName }}
        </h1>

        <!-- Size Selector -->
        <div class="mb-4">
          <label for="size" class="text-lg font-medium">Select Size:</label>
          <select
            id="size"
            class="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">39</option>
            <option value="8">40</option>
            <option value="9">41</option>
            <option value="10">42</option>
          </select>
        </div>

        <!-- Color -->

        <p class="text-gray-600 mb-4">${{ selectedProduct[0].price }}</p>

        <a
          @click="
            store.addToCart(selectedProduct[0]._id), (addProduct = !addProduct)
          "
          :class="addProduct ? 'bg-green-600 disabled-link' : ''"
          class="cursor-pointer flex items-center justify-center md:w-[412px] rounded-md bg-gray-900 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 h-6 w-6"
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

          {{ addProduct ? "Added to Cart!" : "Add to Cart" }}</a
        >
      </div>
    </div>

    <!-- Comment Section -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Comments</h2>
      <div class="bg-gray-50 rounded-lg shadow-md p-6">
        <!-- Single Comment -->
        <div
          v-for="comment in store.comments"
          class="flex items-start mb-6 space-x-4 border-b pb-4 last:border-none last:pb-0"
        >
          <!-- User Avatar -->
          <div class="flex-shrink-0">
            <div
              class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold"
            >
           {{ comment.user ? comment.user.charAt(0).toUpperCase() : '' }}
            </div>
          </div>
          <!-- Comment Content -->
          <div>
            <h3 class="text-lg font-semibold text-gray-800">
              {{ comment.user }}
            </h3>
            <p class="text-gray-700 mb-2">{{ comment.text }}</p>
            <p class="text-sm text-gray-500 italic">
              Posted on
              <span class="font-medium text-gray-600">{{
                new Date(comment.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Comment Form -->
    <form class="mt-4" @submit.prevent="addComment">
      <h3 class="text-lg font-medium mb-2">Leave a Comment</h3>
      <textarea
        required
        v-model="comment"
        class="w-full h-24 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded resize-none"
        placeholder="Write your comment here..."
      ></textarea>
      <button
        type="submit"
        class="mt-4 bg-gray-900 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  </div>
</template>
