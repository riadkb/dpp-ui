<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import StatCard from "@/components/StatCard.vue";
import  BaseInput from "@/components/InputComponent.vue";


const stats = [
  { title: "Total Brands", count: 10 },
  { title: "Total Users", count: 25 },
];
</script>

<template>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-2 gap-4">
      <StatCard v-for="stat in stats" :key="stat.title" :title="stat.title" :count="stat.count" />
    </div>

    
  <div class="space-y-4">
    <BaseInput v-model="name" label="Name" id="name" placeholder="Enter your name" />
    <BaseInput v-model="email" label="Email" id="email" type="password" placeholder="Enter your email" :error="errorMessage" />
  </div>
</template>
