<template>
    <div class="p-6">
      <h1 class="text-2xl font-semibold">Brand Details</h1>
  
      <!-- Brand Info -->
      <div v-if="brand" class="mt-4 p-6 bg-white shadow-md rounded-lg">
        <img :src="brand.image" alt="Brand Logo" class="w-32 h-32 rounded-md shadow" />
        <h2 class="text-xl font-bold mt-2">{{ brand.name }}</h2>
        <p class="mt-1 text-gray-600">Wallet Address: {{ brand.wallet_address }}</p>
        <p class="mt-1 text-gray-600">Wallet ID: {{ brand.wallet_id }}</p>
        <p class="mt-2 text-gray-600">Other Info: {{ brand.otherInfo }}</p>

      </div>
      <div v-else class="text-gray-500">Loading...</div>
  
      <!-- Products Table -->
      <div v-if="products.length" class="mt-6 bg-white shadow-md rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-4">Products</h2>
        <table class="w-full border-collapse border border-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="border border-gray-300 p-2 text-left">Product</th>
              <th class="border border-gray-300 p-2 text-left">Price</th>
              <th class="border border-gray-300 p-2 text-left">Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
              <td class="border border-gray-300 p-2 flex items-center space-x-3">
                <img :src="product.image" alt="Product Image" class="w-10 h-10 rounded-md shadow-sm" />
                <span>{{ product.name }}</span>
              </td>
              <td class="border border-gray-300 p-2">${{ product.price }}</td>
              <td class="border border-gray-300 p-2">{{ product.stock }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-gray-500 mt-4">No products available for this brand.</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const brand = ref(null);
  const products = ref([]);
  
  onMounted(() => {
    // Mock Brand Data (Replace with API call later)
    brand.value = {
      id: route.params.id,
      name: "Nike",
      image: "https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png",
      wallet_address: "0x123456789abcdef",
      wallet_id: "12564796",
      otherInfo: "Leading sports brand",
    };
  
    // Mock Product Data (Replace with API call later)
    products.value = [
      { id: 1, name: "Air Max", price: 150, stock: 25, image: "https://via.placeholder.com/50" },
      { id: 2, name: "Air Jordan", price: 200, stock: 15, image: "https://via.placeholder.com/50" },
      { id: 3, name: "Blazer Mid", price: 120, stock: 30, image: "https://via.placeholder.com/50" },
    ];
  });
  </script>
  