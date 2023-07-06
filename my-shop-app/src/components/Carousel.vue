<script setup>
import { ref, onMounted } from 'vue';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css/skyblue'
const images = ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80","https://media.istockphoto.com/id/1337191336/photo/black-fashion-sport-shoe-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=DAsn_Qj_gjJ42BDr33CU10QO3ckCMD93KFyuP7qrvN8=","https://media.istockphoto.com/id/1320501530/photo/white-sneaker-on-a-blue-gradient-background-mens-fashion-sport-shoe-sneakers-lifestyle.jpg?b=1&s=170667a&w=0&k=20&c=-iiKNaFkLHe1WClYWJa7d7wR85HEhEpA2tsRYknnX4E="]
onMounted(() => {
  new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    gap: '1rem',
    arrows: false,
    autoplay: true,
    interval: 2500,
    pagination: false,
    breakpoints: {
      640: {
        perPage: 1,
      },
      768: {
        perPage: 2,
      },
      1024: {
        perPage: 3,
      },
    },
  }).mount()
})

</script>
<template>
    <section class="text-black py-20 bg-gray-100">
        <div class="container mx-auto px-4">
            <div class="flex justify-center items-center">
                <div class="splide w-full md:w-1/3">
                    <div class="splide__track ">
                        <div class="splide__list">
                            <div v-for="image in images" :key="image.id" class="splide__slide">
                                <img class="object-cover" :src="image" :alt="image.alt">
                            </div>
                        </div>
                    </div>
                    <h1 class="text-4xl font-bold mb-6">
                        Find your perfect shoes here
                    </h1>
                    <p class="text-lg mb-10">
                        Discover our latest collection of shoes that combines comfort and
                        style
                    </p>
                    <a href="#"
                        class="bg-gray-900 text-gray-100 py-2 px-4 rounded-md font-bold text-lg hover:bg-gray-800 ">Go to
                        new arrivals</a>
                </div>
            </div>
        </div>
</section></template>