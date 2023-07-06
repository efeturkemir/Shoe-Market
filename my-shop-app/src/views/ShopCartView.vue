<script setup>
import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import { useProductStore } from '../stores/ProductsStore';
const store = useProductStore()
let total = ref(0);
let checkout = ref(false)
for (let i = 0; i < store.productsOnCart.length; i++) {
  store.productsOnCart[i].quantity = 1;
}


async function increase(id){
  const item = store.productsOnCart.find(element => element._id === id)
   item.quantity++
   const price = await item.price
   total.value += await price
   

  }
  async function removeItem(id){
    store.productsOnCart = store.productsOnCart.filter(product => product._id != id)
  }
  async function decrease(id){
  const item = store.productsOnCart.find(element => element._id === id)
  if(item.quantity > 1){
   item.quantity--
   const price = await item.price
   total.value -= await price
  }
}

store.productsOnCart.forEach(element =>{
  total.value += element.price
})


</script>
<template>
<Navbar></Navbar>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row lg:justify-between">
      <div class="w-full lg:w-2/3">
        <div class="flex flex-col mt-8">
          <div class="flex-1">
            <h2 class="text-lg font-medium leading-6 text-gray-900">Shopping Cart</h2>
          </div>
          <div class="flex-1 mt-4">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Product
                    </th>
                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Total
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="product in store.productsOnCart">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 w-10 h-10">
                          <img class="w-full h-full object-contain rounded-md" :src="product.productImage" alt="">
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{product.productName}}</div>
                          <div class="text-sm text-gray-500">{{product.type}}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{product.price}}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center justify-between w-24">
                        <button class="text-gray-500 hover:text-gray-700" @click="decrease(product._id)" aria-label="Decrease quantity">
                          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5 10h10v1H5z"></path>
                          </svg>
                        </button>
                        <span class="text-gray-700">{{ product.quantity }}</span>
                        <button class="text-gray-500 hover:text-gray-700" @click="increase(product._id)" aria-label="Increase quantity">
                          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 5v10h1V5z"></path>
                            <path d="M5 10h10v1H5z"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">${{Math.round((product.quantity * product.price) * 1e12) / 1e12}}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <button class="text-gray-500 hover:text-gray-700" @click="removeItem(product._id)" aria-label="Remove item">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.3 6.3a1 1 0 011.4 0L10 8.6l2.3-2.3a1 1 0 011.4 1.4L11.4 10l2.3 2.3a1 1 0 01-1.4 1.4L10 11.4l-2.3 2.3a1 1 0 01-1.4-1.4L8.6 10 6.3 7.7a1 1 0 010-1.4z"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <!-- More items... -->
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/3 mt-8 lg:mt-0">
        <div class="bg-white p-4 rounded-md shadow-md">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Summary</h3>
          <div class="mt-4">
            <div class="flex justify-between text-sm font-medium text-gray-600">
              <span>Subtotal:</span>
              <span>${{Math.round((total) * 1e11) / 1e11}}</span>
            </div>
            <div class="flex justify-between mt-2 text-sm font-medium text-gray-600">
              <span>Shipping:</span>
              <span>$0.00</span>
            </div>
            <hr class="mt-2 mb-4">
            <div class="flex justify-between text-lg font-medium text-gray-900">
              <span>Total:</span>
              <span>${{Math.round((total) * 1e11) / 1e11}}</span>
            </div>
            <button @click="checkout = !checkout" class="mt-4 w-full bg-gray-800 text-white text-center py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div :class="checkout ? 'scale-100' : ''" class=" fixed scale-0 z-10 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
    <!-- Overlay background -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
    <!-- Modal content -->
    <div :class="checkout ? 'scale-100' : ''" class="transform scale-0 transition-transform duration-300 relative z-10 w-full  max-w-md p-6 bg-white rounded-lg shadow-lg">
      <!-- Icon -->
      <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-green-500 bg-green-100 rounded-full">
        <svg class="w-6 h-6 fill-current" viewBox="0 0 20 20">
          <path d="M17.707 4.293c-.391-.391-1.023-.391-1.414 0l-7.293 7.293-3.293-3.293c-.391-.391-1.023-.391-1.414 0-.391.391-.391 1.023 0 1.414l4 4c.195.195.451.293.707.293s.512-.098.707-.293l8-8c.391-.391.391-1.023 0-1.414z"></path>
        </svg>
      </div>
      <!-- Message -->
      <p class="text-lg font-medium text-gray-800">Payment successful!</p>
      <!-- Button -->
      <div class="mt-6">
        <button  class="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500">
         <RouterLink @click="store.clearCart" to="/">Go Back to shopping</RouterLink> 
        </button>
      </div>
    </div>
  </div>
</div>
</template>