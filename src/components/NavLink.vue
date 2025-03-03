<template>
    <RouterLink 
      :to="to"
      class="group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
        hover:bg-gray-100 hover:shadow-sm active:bg-gray-200 relative"
    >
      <span v-if="icon" class="material-icons text-gray-500 group-hover:text-gray-900">
        {{ icon }}
      </span>
      <span class="font-medium group-hover:text-gray-900">
        {{ name }}
      </span>
  
      <!-- Full Underline Effect -->
      <span 
        class="absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-300 ease-in-out"
        :class="{ 'w-full': isActive, 'w-0 group-hover:w-full': !isActive }"
      ></span>
    </RouterLink>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  const props = defineProps({
    to: String,
    icon: String,
    name: String
  });
  
  const route = useRoute();
  const isActive = computed(() => route.path === props.to || route.path.startsWith(props.to));
  </script>
  