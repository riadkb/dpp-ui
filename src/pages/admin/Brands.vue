<template>
      <div class="bg-white/50 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-gray-200">

        <!-- Search and Add Brand Section -->
        <div class="flex items-center justify-between gap-4 mb-4">
          <!-- Search Input -->
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search brands..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none transition-all duration-200"
          />
          
        </div>
        <!-- Add Brand Button -->
        <HeaderComponent title="Brands" buttonLabel="Add Brand" :onButtonClick="openModal" />

      <!-- Brand Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <BrandCard 
          v-for="brand in filteredBrands" 
          :key="brand.id" 
          :brand="brand" 
          @edit="openModal('edit', $event)" 
          @delete="deleteBrand($event)"
        />
      </div>
  
      <!-- Brand Modal -->
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center  backdrop-blur-xs bg-opacity-50 drop-shadow-3xl">
        <div class="bg-gray-200 drop-shadow-3xl p-6 rounded-lg w-96">
          <h3 class="text-lg font-semibold mb-4">{{ modalType === 'add' ? 'Add Brand' : 'Edit Brand' }}</h3>
          <input 
            v-model="brandName" 
            type="text" 
            placeholder="Enter brand name" 
            class="w-full border rounded-lg px-3 py-2 mb-4"
          />
          <input 
            v-model="brandImage" 
            type="text" 
            placeholder="Enter image URL" 
            class="w-full border rounded-lg px-3 py-2 mb-4"
          />
          <div class="flex justify-end space-x-2">
            <button @click="closeModal" class="cursor-pointer px-4 py-2 text-sm font-medium text-red-600 border-cyan-400 rounded-lg hover:bg-red-400 hover:text-white transition-all duration-300">Cancel</button>
            <button 
              @click="modalType === 'add' ? addBrand() : updateBrand()" 
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
  import { ref, computed } from 'vue'
  import BrandCard from '@/components/BrandCard.vue'
  import HeaderComponent from '@/components/HeaderComponent.vue';
  
  // Sample data
  const brands = ref([
    { id: 1, name: 'Nike', image: 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png' },
    { id: 2, name: 'Adidas', image: 'https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png' },
    { id: 3, name: 'Puma', image: 'https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png' },
    { id: 4, name: 'Reebok', image: 'https://logos-world.net/wp-content/uploads/2020/04/Reebok-Logo.png' }
  ])
  
  const searchQuery = ref('')
  const showModal = ref(false)
  const modalType = ref('add')
  const brandName = ref('')
  const brandImage = ref('')
  const editingBrandId = ref(null)
  
  // Computed Filtered Brands
  const filteredBrands = computed(() => {
    return brands.value.filter(brand =>
      brand.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  
  // Open Modal for Add/Edit
  const openModal = (type, brand = null) => {
    modalType.value = type
    if (type === 'edit' && brand) {
      brandName.value = brand.name
      brandImage.value = brand.image
      editingBrandId.value = brand.id
    } else {
      brandName.value = ''
      brandImage.value = ''
      editingBrandId.value = null
    }
    showModal.value = true
  }
  
  // Close Modal
  const closeModal = () => {
    showModal.value = false
    brandName.value = ''
    brandImage.value = ''
  }
  
  // Add Brand
  const addBrand = () => {
    if (brandName.value.trim() === '') return
    brands.value.push({ id: Date.now(), name: brandName.value, image: brandImage.value })
    closeModal()
  }
  
  // Update Brand
  const updateBrand = () => {
    if (brandName.value.trim() === '') return
    const index = brands.value.findIndex(brand => brand.id === editingBrandId.value)
    if (index !== -1) {
      brands.value[index].name = brandName.value
      brands.value[index].image = brandImage.value
    }
    closeModal()
  }
  
  // Delete Brand
  const deleteBrand = (id) => {
    brands.value = brands.value.filter(brand => brand.id !== id)
  }
  </script>
  