<script setup>
import { ref, reactive } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

const users = ref([
  { id: 1, email: 'john@example.com', role: 'admin', phone: '213123', isSuperUser: true },
  { id: 2, email: 'alice@example.com', role: 'user', phone: '458123', isSuperUser: false },
]);

const columns = ['ID', 'Email', 'Role', 'Phone', 'Super User'];

const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const selectedUser = ref(null);

const form = reactive({
  id: null,
  email: '',
  role: '',
  phone: '',
  isSuperUser: false,
});

// Open modal for adding/editing
const openModal = (user = null) => {
  if (user) {
    isEditing.value = true;
    form.id = user.id;
    form.email = user.email;
    form.role = user.role;
    form.phone = user.phone;
    form.isSuperUser = user.isSuperUser;
  } else {
    isEditing.value = false;
    Object.assign(form, { id: null, email: '', role: '', phone: '', isSuperUser: false });
  }
  showModal.value = true;
};

// Save user (add or update)
const saveUser = () => {
  if (isEditing.value) {
    const index = users.value.findIndex((u) => u.id === form.id);
    if (index !== -1) {
      users.value.splice(index, 1, { ...form }); // ✅ Fix: Ensures reactivity
    }
  } else {
    users.value.push({ id: Date.now(), ...form });
  }
  showModal.value = false;
};

// Open delete modal
const confirmDelete = (user) => {
  selectedUser.value = user;
  showDeleteModal.value = true;
};

// Delete user
const deleteUser = () => {
  users.value = users.value.filter((u) => u.id !== selectedUser.value.id);
  showDeleteModal.value = false;
};
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">

    <div class="overflow-hidden rounded-lg shadow-md">
    <div class="p-6">
    <div class="flex justify-between mb-4">
      <HeaderComponent title="Users" buttonLabel="Add User" :onButtonClick="openModal" />
    </div>
      
    <table class="w-full bg-white border border-gray-300">
        <thead class="bg-gray-200 text-gray-700">
          <tr>
            <th class="border border-gray-300 px-4 py-2 text-center">ID</th>
            <th class="border border-gray-300 px-4 py-2 text-center">Email</th>
            <th class="border border-gray-300 px-4 py-2 text-center">Role</th>
            <th class="border border-gray-300 px-4 py-2 text-center">Phone</th>
            <th class="border border-gray-300 px-4 py-2 text-center">Super User</th>
            <th class="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-100">
            <td class="border border-gray-300 px-4 py-2 text-center">{{ user.id }}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">{{ user.email }}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">{{ user.role }}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">{{ user.phone }}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              <span :class="user.isSuperUser ? 'text-gray-600 font-semibold' : 'text-gray-500'">
                {{ user.isSuperUser ? 'Yes' : 'No' }}
              </span>
            </td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              <button @click="openModal(user)" class="cursor-pointer px-4 py-2 text-sm font-medium text-cyan-600 border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-300">
                Edit
              </button>
              <button @click="confirmDelete(user)" class="cursor-pointer px-4 py-2 text-sm font-medium text-red-500 border-red-400 rounded-lg hover:bg-red-400 hover:text-white transition-all duration-300">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    </div>

    <!-- Add/Edit User Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center  backdrop-blur-xs bg-opacity-50 drop-shadow-3xl">
      <div class="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h3 class="text-lg font-semibold mb-4 text-gray-700">
          {{ isEditing ? 'Edit User' : 'Add User' }}
        </h3>

        <label class="block mb-2 text-gray-600">Email</label>
        <input v-model="form.email" type="email" class="w-full border px-3 py-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500" />

        <label class="block mb-2 text-gray-600">Role</label>
        <input v-model="form.role" type="text" class="w-full border px-3 py-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500" />

        <label class="block mb-2 text-gray-600">Phone</label>
        <input v-model="form.phone" type="tel" class="w-full border px-3 py-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500" />

        <div class="flex items-center mb-4">
          <div class="flex items-center mb-3">
            <input v-model="form.isSuperUser" type="checkbox" class="w-5 h-5 mr-2" />
            <label class="text-gray-700">Super User</label>
        </div>
        </div>

        <div class="flex justify-end space-x-2">
          <button @click="showModal = false" class="px-4 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400">Cancel</button>
          <button @click="saveUser" class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
            {{ isEditing ? 'Update' : 'Save' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-lg font-semibold mb-4 text-gray-700">Delete User</h3>
        <p class="text-gray-600">Are you sure you want to delete <strong>{{ selectedUser?.email }}</strong>?</p>
        <div class="flex justify-end space-x-2 mt-4">
          <button @click="showDeleteModal = false" class="px-4 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400">Cancel</button>
          <button @click="deleteUser" class="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
