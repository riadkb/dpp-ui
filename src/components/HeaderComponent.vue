<script setup>
const emit = defineEmits(["button-click"]);
defineProps({
  title: String,
  buttonLabel: String,
});
</script>

<template>
  <div class="w-full bg-white px-6 py-4 rounded-lg shadow-md flex items-center justify-between">
    <h2 class="text-2xl font-semibold text-gray-800">{{ title }}</h2>

    <button 
  @click="emit('button-click')" 
  class="relative px-6 py-2 bg-blue-400 text-white font-medium rounded-lg shadow-md 
         transition-all duration-300 ease-in-out 
         hover:bg-blue-300 hover:shadow-md 
         active:scale-95"
>
  {{ buttonLabel }}
</button>
  </div>
</template>
