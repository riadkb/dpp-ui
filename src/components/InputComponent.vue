<template>
    <div class="w-full max-w-sm">
      <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      <div class="relative">
        <span v-if="icon" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <slot name="icon"></slot>
        </span>
        <input
          :id="id"
          :type="type"
          :placeholder="placeholder"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="peer mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-900 shadow-sm outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        <!-- Animated Bottom Border -->
        <div class="absolute left-0 bottom-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 peer-focus:w-full"></div>
      </div>
  
      <!-- Animated Error Message -->
      <transition name="fade">
        <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
      </transition>
    </div>
  </template>
  
  <script setup>
  defineProps({
    modelValue: String,
    label: String,
    id: String,
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    error: String,
    icon: Boolean, // Enable icon slot
  });
  
  defineEmits(['update:modelValue']);
  </script>
  
  <style scoped>
  /* Smooth Fade Animation */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }
  </style>
  