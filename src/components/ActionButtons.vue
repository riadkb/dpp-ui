<script setup>
import { ref } from "vue";

// Hover states
const isEditHovered = ref(false);
const isDeleteHovered = ref(false);

defineProps({
  onEdit: Function,
  onDelete: Function,
});
</script>

<template>
  <div class="flex justify-center items-center space-x-3">
    <!-- Edit Button -->
    <button 
      @click="onEdit"
      @mouseenter="isEditHovered = true" 
      @mouseleave="isEditHovered = false"
      class="cursor-pointer relative px-5 py-2 text-sm font-medium text-cyan-600 rounded-lg 
             transition duration-300 ease-out 
             hover:bg-cyan-500 hover:text-white 
             active:scale-95 flex items-center justify-center"
    >
      <span 
        v-if="isEditHovered"
        class="absolute inset-0 w-full h-full bg-cyan-300 opacity-20 rounded-lg animate-ping"
      ></span>
      Edit
    </button>

    <!-- Delete Button -->
    <button 
      @click="onDelete"
      @mouseenter="isDeleteHovered = true" 
      @mouseleave="isDeleteHovered = false"
      class="cursor-pointer relative px-5 py-2 text-sm font-medium text-red-500 rounded-lg 
             transition duration-300 ease-out 
             hover:bg-red-500 hover:text-white 
             active:scale-95 flex items-center justify-center"
    >
      <span 
        v-if="isDeleteHovered"
        class="absolute inset-0 w-full h-full bg-red-300 opacity-20 rounded-lg animate-ping"
      ></span>
      Delete
    </button>
  </div>
</template>
