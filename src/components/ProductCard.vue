<template>
    <div class="relative cursor-pointer bg-gray-200 backdrop-blur-xl border border-gray-200 p-6 rounded-2xl shadow-2xl flex flex-col items-center space-y-4 transition-all duration-300 transform hover:scale-105">
      
      <!-- ✅ Eye Icon (View Details) in the Top Right Corner -->
      <RouterLink 
        :to="`/admin/products/${product.id}`" 
        class="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-500 hover:text-white transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5c-7.5 0-10 7.5-10 7.5s2.5 7.5 10 7.5 10-7.5 10-7.5-2.5-7.5-10-7.5zM12 15a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      </RouterLink>
  
      <!-- ✅ Product Image -->
      <div class="relative">
        <img 
          :src="product.image || defaultImage" 
          alt="Product Image" 
          class="w-36 h-36 object-cover rounded-xl shadow-2xl transition-all duration-300"
        />
        <div class="absolute inset-0 rounded-xl bg-cyan-800 opacity-20 blur-xl"></div>
      </div>
  
      <!-- ✅ Product Name -->
      <h3 class="cursor-text text-xl font-semibold text-gray-900 tracking-wide">{{ product.name }}</h3>
  
      <!-- ✅ Product Symbol (Optional) -->
      <p v-if="product.symbol" class="text-gray-600 text-sm">{{ product.symbol }}</p>
  
      <!-- ✅ Edit & Delete Buttons -->
      <div class="flex space-x-4">
        <button @click="$emit('edit', product)" class="cursor-pointer px-4 py-2 text-sm font-medium text-cyan-600 border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-300">
          Edit
        </button>
        <button @click="$emit('delete', product.id)" class="cursor-pointer px-4 py-2 text-sm font-medium text-red-500 border-red-400 rounded-lg hover:bg-red-400 hover:text-white transition-all duration-300">
          Delete
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import { RouterLink } from 'vue-router'
  
  defineProps({
    product: Object
  })
  
  const defaultImage = 'https://via.placeholder.com/150'
  </script>
  