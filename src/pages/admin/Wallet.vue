<script setup>
import { ref, reactive } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ActionButtons from '@/components/ActionButtons.vue';


const wallets = ref([
    { id: 1, userId: 101, address: '0x123abc', uid: 'UID123', description: 'Main wallet', creationDate: '2025-03-03', label: 'Admin' },
    { id: 2, userId: 102, address: '0x456def', uid: 'UID456', description: 'Secondary wallet', creationDate: '2025-03-02', label: 'User' },
    { id: 3, userId: 103, address: '0x789ghi', uid: 'UID789', description: 'Backup wallet', creationDate: '2025-03-01', label: 'Guest' },
]);

const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const selectedWallet = ref(null);

const form = reactive({
  id: null,
  userId: '',
  address: '',
  uid: '',
  description: '',
  creationDate: '',
  label: '',
});

// Open modal for adding/editing a wallet
const openModal = (wallet = null) => {
  if (wallet) {
    isEditing.value = true;
    Object.assign(form, { ...wallet });
  } else {
    isEditing.value = false;
    Object.assign(form, { id: null, userId: '', address: '', uid: '', description: '', creationDate: '', label: '' });
  }
  showModal.value = true;
};

// Save wallet (add or update)
const saveWallet = () => {
  if (isEditing.value) {
    const index = wallets.value.findIndex((w) => w.id === form.id);
    if (index !== -1) {
      wallets.value[index] = { ...form };
    }
  } else {
    wallets.value.push({ id: Date.now(), ...form });
  }
  showModal.value = false;
};

// Open delete modal
const confirmDelete = (wallet) => {
  selectedWallet.value = wallet;
  showDeleteModal.value = true;
};

// Delete wallet
const deleteWallet = () => {
  wallets.value = wallets.value.filter((w) => w.id !== selectedWallet.value.id);
  showDeleteModal.value = false;
};
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <div class="overflow-hidden rounded-lg shadow-md">
      <div class="p-6">
        <div class="flex justify-between mb-4">
            <HeaderComponent title="Wallets" buttonLabel="Add Wallet" :onButtonClick="openModal" />
        </div>

        <table class="w-full bg-white border border-gray-300">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="border border-gray-300 px-4 py-2 text-center">ID</th>
              <th class="border border-gray-300 px-4 py-2 text-center">User ID</th>
              <th class="border border-gray-300 px-4 py-2 text-center">Address</th>
              <th class="border border-gray-300 px-4 py-2 text-center">UID</th>
              <th class="border border-gray-300 px-4 py-2 text-center">Description</th>
              <th class="border border-gray-300 px-4 py-2 text-center">Creation Date</th>
              <th class="border border-gray-300 px-4 py-2 text-center">Label</th>
              <th class="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wallet in wallets" :key="wallet.id" class="hover:bg-gray-100">
              <td class="border border-gray-300 px-4 py-2 text-center">{{ wallet.id }}</td>
              <td class="border border-gray-300 px-4 py-2 text-center">{{ wallet.userId }}</td>
              <td class="border border-gray-300 px-4 py-2 text-center">{{ wallet.address }}</td>
              <td class="border border-gray-300 px-4 py-2 text-center">{{ wallet.uid }}</td>
              <td class="border border-gray-300 px-4 py-2 text-center">{{ wallet.description }}</td>
              <td class="border border-gray-300 px-4 py-2 text-center">{{ wallet.creationDate }}</td>
              <td class="border border-gray-300 px-4 py-2 text-center">{{ wallet.label }}</td>
              <td class="border border-gray-300 px-4 py-2 text-center">
                <ActionButtons 
                :onEdit="() => openModal(wallet)" 
                :onDelete="() => confirmDelete(wallet)" 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Wallet Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center  backdrop-blur-xs bg-opacity-50 drop-shadow-3xl">
      <div class="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h3 class="text-lg font-semibold mb-4 text-gray-700">
          {{ isEditing ? 'Edit Wallet' : 'Add Wallet' }}
        </h3>

        <label class="block mb-2 text-gray-600">User ID</label>
        <input v-model="form.userId" type="number" class="w-full border px-3 py-2 rounded-lg mb-3" />

        <label class="block mb-2 text-gray-600">Address</label>
        <input v-model="form.address" type="text" class="w-full border px-3 py-2 rounded-lg mb-3" />

        <label class="block mb-2 text-gray-600">UID</label>
        <input v-model="form.uid" type="text" class="w-full border px-3 py-2 rounded-lg mb-3" />

        <label class="block mb-2 text-gray-600">Description</label>
        <input v-model="form.description" type="text" class="w-full border px-3 py-2 rounded-lg mb-3" />

        <label class="block mb-2 text-gray-600">Creation Date</label>
        <input v-model="form.creationDate" type="date" class="w-full border px-3 py-2 rounded-lg mb-3" />

        <label class="block mb-2 text-gray-600">Label</label>
        <input v-model="form.label" type="text" class="w-full border px-3 py-2 rounded-lg mb-3" />

        <div class="flex justify-end space-x-2">
          <button @click="showModal = false" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
          <button @click="saveWallet" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            {{ isEditing ? 'Update' : 'Save' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-lg font-semibold mb-4 text-gray-700">Delete Wallet</h3>
        <p class="text-gray-600">Are you sure you want to delete wallet <strong>{{ selectedWallet?.uid }}</strong>?</p>
        <div class="flex justify-end space-x-2 mt-4">
          <button @click="showDeleteModal = false" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
          <button @click="deleteWallet" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
