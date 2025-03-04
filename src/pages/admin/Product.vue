<template>
    <!-- Add Product Button & Search -->
    <HeaderComponent 
      title="Products" 
      buttonLabel="Add Product" 
      @button-click="openModal('add')" 
    />
  
    <div class="bg-white/50 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-gray-200">
      
      <!-- Search Input -->
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search products..." 
        class="w-full border rounded-lg px-3 py-2 mb-4"
      />
  
      <!-- Product Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product" 
          @edit="openModal('edit', $event)" 
          @delete="deleteProduct"
          class="w-full max-w-xs mx-auto"
        />
      </div>
  
      <!-- Product Modal -->
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 drop-shadow-3xl">
        <div class="bg-gray-200 drop-shadow-3xl p-6 rounded-lg w-96">
          <h3 class="text-lg font-semibold mb-4">{{ modalType === 'add' ? 'Add Product' : 'Edit Product' }}</h3>
  
          <input 
            v-model="name" 
            type="text" 
            placeholder="Enter product name" 
            class="w-full border rounded-lg px-3 py-2 mb-2"
          />
          <input 
            v-model="symbol" 
            type="text" 
            placeholder="Enter symbol" 
            class="w-full border rounded-lg px-3 py-2 mb-2"
          />
          <input 
            v-model="description" 
            type="text" 
            placeholder="Enter description" 
            class="w-full border rounded-lg px-3 py-2 mb-2"
          />
          <input 
            v-model="image" 
            type="text" 
            placeholder="Enter image link" 
            class="w-full border rounded-lg px-3 py-2 mb-2"
          />
          <input 
            v-model="url" 
            type="text" 
            placeholder="Enter URL" 
            class="w-full border rounded-lg px-3 py-2 mb-4"
          />
  
          <div class="flex justify-end space-x-2">
            <button @click="closeModal" class="cursor-pointer px-4 py-2 text-sm font-medium text-red-600 border-cyan-400 rounded-lg hover:bg-red-400 hover:text-white transition-all duration-300">
              Cancel
            </button>
            <button 
              @click="modalType === 'add' ? addProduct() : updateProduct()" 
              class="cursor-pointer px-4 py-2 text-sm font-medium text-blue-600 border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-300"
            >
              {{ modalType === 'add' ? 'Add' : 'Update' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import ProductCard from '@/components/ProductCard.vue';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  
  // Sample product data
  const products = ref([
    { id: 1, name: 'Laptop', symbol: 'LTP', description: 'A powerful laptop', image: 'https://via.placeholder.com/150', url: 'https://example.com/laptop' },
    { id: 2, name: 'Smartphone', symbol: 'SMP', description: 'A modern smartphone', image: 'https://via.placeholder.com/150', url: 'https://example.com/smartphone' },
    { id: 3, name: 'Headphones', symbol: 'HDP', description: 'Noise-cancelling headphones', image: 'https://via.placeholder.com/150', url: 'https://example.com/headphones' }
  ]);
  
  const searchQuery = ref('');
  const showModal = ref(false);
  const modalType = ref('add');
  const name = ref('');
  const symbol = ref('');
  const description = ref('');
  const image = ref('');
  const url = ref('');
  const editingProductId = ref(null);
  
  // Computed property for filtering products
  const filteredProducts = computed(() => {
    return products.value.filter(product => 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.symbol.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  // Open Modal for Add/Edit
  const openModal = (type, product = null) => {
    modalType.value = type;
    if (type === 'edit' && product) {
      name.value = product.name;
      symbol.value = product.symbol;
      description.value = product.description;
      image.value = product.image;
      url.value = product.url;
      editingProductId.value = product.id;
    } else {
      name.value = '';
      symbol.value = '';
      description.value = '';
      image.value = '';
      url.value = '';
      editingProductId.value = null;
    }
    showModal.value = true;
  };
  
  // Close Modal
  const closeModal = () => {
    showModal.value = false;
    name.value = '';
    symbol.value = '';
    description.value = '';
    image.value = '';
    url.value = '';
  };
  
  // Add Product
  const addProduct = () => {
    if (name.value.trim() === '') return;
    products.value.push({ 
      id: Date.now(), 
      name: name.value, 
      symbol: symbol.value, 
      description: description.value,
      image: image.value, 
      url: url.value
    });
    closeModal();
  };
  
  // Update Product
  const updateProduct = () => {
    if (name.value.trim() === '') return;
    const index = products.value.findIndex(product => product.id === editingProductId.value);
    if (index !== -1) {
      products.value[index].name = name.value;
      products.value[index].symbol = symbol.value;
      products.value[index].description = description.value;
      products.value[index].image = image.value;
      products.value[index].url = url.value;
    }
    closeModal();
  };
  
  // Delete Product
  const deleteProduct = (id) => {
    products.value = products.value.filter(product => product.id !== id);
  };
  </script>
  