<template>
  <div class="w-64 h-screen bg-white text-gray-800 p-5 shadow-xl border-r border-gray-200">
    <h2 class="text-2xl font-semibold mb-6 tracking-wide">Admin Panel</h2>

    <nav>
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.to">
          <NavLink 
            :to="item.to"  
            :name="item.name"
            :icon="item.icon"
          />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import NavLink from '@/components/NavLink.vue';

export default {
  components: { NavLink },
  data() {
    return {
      menuItems: [
        { name: 'Dashboard', to: '/admin/dashboard' },
        { name: 'Brands', to: '/admin/brands'},
        { name: 'Users', to: '/admin/users'},
        { name: 'Wallets', to: '/admin/wallets'},
        { name: 'Products', to: '/admin/products'},
      ],
    };
  },
};
</script>
