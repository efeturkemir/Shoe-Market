<script setup>
import { useProductStore } from '../stores/ProductsStore';
import { useAuthStore } from '../stores/AuthStore'
import Product from './Product.vue';
import { computed } from 'vue';
const store = useProductStore()
const userStore = useAuthStore()

const username = userStore.user.username
    const filteredProducts = computed(() => {
        let products = store.products

        if (store.selectedBrand && store.selectedBrand !== 'All') {
        products = products.filter(product => product.brandName === store.selectedBrand)
      }

      if (store.selectedGender && store.selectedGender !== 'All') {
        products = products.filter(product => product.gender === store.selectedGender)
      }
      if (store.selectedType && store.selectedType !== 'All') {
        products = products.filter(product => product.type === store.selectedType)
      }
      if(store.selectedPrice && store.selectedPrice !== 'All'){
        let price = store.selectedPrice
        switch (price) {
            case '0-50':
                products = products.filter(product => product.price >= 0 && product.price <= 50)
                break;
         case '50-100':
            products = products.filter(product => product.price >= 50 && product.price <= 100)
            break;
            case '100-150':
            products = products.filter(product => product.price >= 100 && product.price <= 150)
            break;
            default:
                break;
        }
      }
    
     
      return products
    })
</script>
<template>
    <section class="bg-gray-100 py-20">
        <div class="container mx-auto px-4">
            <h1 class="text-2xl font-bold mb-10">Welcome, {{ username }}</h1>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-y-1 gap-x-1">

                <Product v-for="product in filteredProducts" :product-name="product.productName" :key="product._id" :price="product.price"
                    :product-img="product.productImage" :id="product._id"></Product>
                     <h1 v-show="filteredProducts.length === 0">There are no products in this category..</h1>
            </div>
        </div>
    </section>
</template>
