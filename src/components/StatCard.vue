<script setup>
defineProps({
  title: String,
  count: Number,
});
</script>

<template>
  <div class="bg-white shadow-lg rounded-2xl p-6 flex items-center space-x-4">
    <div>
      <h3 class="text-xl font-semibold">Total Users</h3>
      <p class="text-2xl font-bold">1,245</p>
    </div>
  </div>
</template>