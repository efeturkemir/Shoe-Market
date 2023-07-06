<script setup>
import { ref } from 'vue';
import { useProductStore } from '../stores/ProductsStore';
const store = useProductStore()
defineProps({
    productName: String,
    productImg: String,
    price: Number,
    id: String
})

let fav = ref(false)
let addProduct = ref(false)


</script>
<template>
    <div
        class="relative m-1 md:m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <RouterLink :to="`/products/${id}`"> <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <img class="object-contain" :src="productImg" alt="product image" />

            </a>
        </RouterLink>
        <div class="mt-4 px-5 pb-5">
            <a>
                <h5 class="text-xl tracking-normal line-clamp-1 text-slate-900">{{ productName }}</h5>
            </a>
            <div class="mt-2 mb-5 flex items-center justify-between">
                <p>
                    <span class="text-3xl font-bold text-slate-900">${{ price }}</span>

                </p>
                <svg @click="fav = !fav" xmlns="http://www.w3.org/2000/svg"
                    :class="fav ? 'fill-pink-500 text-pink-500' : ''"
                    class=" cursor-pointer mr-2 mt-1 h-6 w-6 flex items-center" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>
            <RouterLink :to="`/products/${id}`">
                <a :class="addProduct ? 'bg-green-600 disabled-link' : ''"
                    class="cursor-pointer flex items-center justify-center rounded-md bg-gray-900 px-5 py-2.5 text-center text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" viewBox="0 0 24 24" fill="none"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>


                    View Details</a>
            </RouterLink>
        </div>
    </div>
</template>
<style>
.disabled-link {
    pointer-events: none;
    text-decoration: none;
    cursor: not-allowed;
}
</style>
