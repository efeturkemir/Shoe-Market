<script setup>
import { RouterView } from 'vue-router';
import { useProductStore } from './stores/ProductsStore';

const store = useProductStore()
store.getProducts()


</script>
<template>
  <h1 v-if="store.loading">Loading...</h1>
  <RouterView v-else></RouterView>
 
</template>
