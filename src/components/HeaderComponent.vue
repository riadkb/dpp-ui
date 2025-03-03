<script setup>
defineProps({
  title: String,
  buttonLabel: String,
  onButtonClick: Function,
});
</script>

<template>
  <div class="w-full bg-white px-6 py-4 rounded-lg shadow-md flex items-center justify-between">
    <h2 class="text-2xl font-semibold text-gray-800">{{ title }}</h2>

    <button 
      @click="onButtonClick"
      class="relative px-6 py-2 bg-blue-400 text-white font-medium rounded-lg shadow-md 
             transition-all duration-300 ease-in-out 
             hover:bg-blue-300  hover:shadow-md 
             active:scale-95"
    >
      {{ buttonLabel }}
      <span 
        class="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 origin-right 
               transition-transform duration-300 ease-in-out 
               hover:scale-x-100"
      ></span>
    </button>
  </div>
</template>
