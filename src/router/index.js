import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "../layouts/AdminLayout.vue"; // ✅ Wrap Admin Pages
import Dashboard from "../pages/admin/Dashboard.vue";
import Brands from "../pages/admin/Brands.vue"; // ✅ Adding Brands Page
import BrandDetail from "../pages/admin/BrandDetail.vue"; // New Page
import User from "../pages/admin/User.vue"; // New Page
import Wallet from "../pages/admin/Wallet.vue"; // New Page

const routes = [
    {
        path: "/admin",
        component: AdminLayout, // ✅ Wrap admin pages inside the layout
        children: [
          { path: "dashboard", name: "Dashboard", component: Dashboard },
          { path: "users", name: "Users", component: User },
          { path: "brands", name: "Brands", component: Brands },
          { path: "wallets", name: "Wallets", component: Wallet },
          { path: "brands/:id", name: "BrandDetail", component: BrandDetail }, // New Route
          { path: "", redirect: "/admin/dashboard" }, // ✅ Default to dashboard
        ],
      },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
