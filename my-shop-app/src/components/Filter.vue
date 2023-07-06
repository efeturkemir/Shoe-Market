<script setup>

import { useProductStore } from '../stores/ProductsStore';


const store = useProductStore()


</script>


<template>
  <div class="flex flex-wrap md:space-x-6 ml-3 bg-gray-100">
    <!-- Brand Name -->
    <div class="w-full md:w-auto mb-4 md:mb-0">
      <label for="brand" class="">Brand Name</label>
      <div class="relative">
        <select  v-model="store.selectedBrand" id="brand" name="brand"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="All" selected>All</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
          <!-- Add more options here -->
        </select>
        
      </div>
    </div>

    <!-- Price -->
    <div class="w-full md:w-auto mb-4 md:mb-0">
      <label for="price" class="">Price</label>
      <div class="relative">
        <select id="price" name="price" v-model="store.selectedPrice"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="All" selected>All</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-150">$100 - $150</option>
          <!-- Add more options here -->
        </select>
       
      </div>
    </div>

    <!-- Gender -->
    <div class="w-full md:w-auto mb-4 md:mb-0">
      <label for="
        gender" class="">Gender</label>
      <div class="relative">
        <select id="gender" name="gender"  v-model="store.selectedGender"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="All" selected >All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
          <!-- Add more options here -->
        </select>
     
      </div>

    </div>
    <!-- Type -->
    <div class="w-full md:w-auto mb-4 md:mb-0">
      <label for="type" class="">Type</label>
      <div class="relative">
        <select id="type" name="type" v-model="store.selectedType"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="All" selected>All</option>
        <option value="Sports">Sports</option>
        <option value="Casual">Casual</option>
        <option value="Running">Running</option>
        <!-- Add more options here -->
      </select>
      
    </div>
  </div>
</div></template>