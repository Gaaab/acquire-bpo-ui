<script lang="ts" setup>
import { mdiEye, mdiPen, mdiTrashCan } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useCustomerStore } from '~/store'
import type { NotificationVariantType } from '~/types'
import CustomerFormModal from '~/components/CustomerFormModal.vue'
import Notification from '~/components/Notification.vue'

const customerStore = useCustomerStore()
const { customers, loading } = storeToRefs(customerStore)
customerStore.getAllCustomers()

const isModalActive = ref(false)
const isModalDangerActive = ref(false)

const initialFormState = () => ({
  first_name: null,
  last_name: null,
  email: null,
  age: null,
  dob: null,
})
const form = ref(initialFormState())

const isNotificationVisible = ref(false)
const isNotificationSuccessVisible = ref(false)

const selectedCustomer = ref<any | undefined>(undefined)
const notificationTitle = ref('')
const notificationMessage = ref('')
const notificationVariant = ref<NotificationVariantType>('error')

const showUpdateCustomerModal = (customer: any) => {
  selectedCustomer.value = customer
  form.value = customer
  isModalActive.value = true
}

const showRemoveCustomerModal = (customer: any) => {
  selectedCustomer.value = customer
  isModalDangerActive.value = true
}

async function submitRemove() {
  try {
    isNotificationVisible.value = false
    isNotificationSuccessVisible.value = false
    const customer = await customerStore.removeCustomer(selectedCustomer.value)
    isModalDangerActive.value = false

    notificationTitle.value = 'Record removed success'
    notificationMessage.value = `Customer ${customer.name} record has been removed successfully`
    notificationVariant.value = 'error'
    isNotificationSuccessVisible.value = true
  } catch (error: any) {
    notificationTitle.value = 'Error'
    notificationMessage.value = error?.response?.data?.message || 'Something went wrong...'
    notificationVariant.value = 'error'
    isNotificationSuccessVisible.value = true
  }
}

async function submitUpdate() {
  try {
    isNotificationVisible.value = false
    isNotificationSuccessVisible.value = false
    const customer = await customerStore.updateCustomer(selectedCustomer.value, form.value)
    isModalActive.value = false

    notificationTitle.value = 'Record update success'
    notificationMessage.value = `Customer ${customer.name} record has been updated successfully`
    notificationVariant.value = 'success'
    isNotificationSuccessVisible.value = true
  } catch (error: any) {
    console.error(error)
    notificationTitle.value = 'Error'
    notificationMessage.value = error?.response?.data?.message || 'Something went wrong...'
    notificationVariant.value = 'error'
    isNotificationVisible.value = true
  }
}
</script>

<template>
  <CustomerFormModal
    v-model:isModalActive="isModalActive"
    title="Update Customer"
    :form="form"
    :notificationTitle="notificationTitle"
    :notificationMessage="notificationMessage"
    :notificationVariant="notificationVariant"
    :isNotificationVisible="isNotificationVisible"
    @submit="submitUpdate"
    @close="selectedCustomer = undefined"
  />

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Please confirm"
    button="danger"
    has-cancel
    @cancel="isModalDangerActive = false"
  >
    <p>
      Removing Customer <strong>{{ selectedCustomer?.name || '' }}</strong> to database.
    </p>
    <p>Are you sure you want to delete this customer record? This action cannot be undone.</p>
    <template #footer="{ cancel }">
      <BaseButtons class="py-4">
        <BaseButton
          label="I understand, Remove"
          is="button"
          outline
          color="text-red-500"
          @click="submitRemove()"
        />
        <BaseButton
          label="Cancel"
          @click="cancel"
        />
      </BaseButtons>
    </template>
  </CardBoxModal>

  <Notification
    v-if="isNotificationSuccessVisible"
    :title="notificationTitle"
    :message="notificationMessage"
    :variant="notificationVariant"
    :duration="1000"
    @close="isNotificationSuccessVisible = false"
  />

  <table>
    <thead>
      <tr>
        <th />
        <th>First Name</th>
        <th>Last Name</th>
        <th>Date of Birth</th>
        <th>Age</th>
        <th>Email</th>
        <th>Created</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-if="!loading"
        v-for="customer in customers"
        :key="customer.id"
      >
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar
            :username="customer.first_name"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          />
        </td>
        <td data-label="first_name">
          {{ customer.first_name }}
        </td>
        <td data-label="last_name">
          {{ customer.last_name }}
        </td>
        <td data-label="dob">
          {{ customer.dob_formatted }}
        </td>
        <td data-label="age">
          {{ customer.age }}
        </td>
        <td data-label="email">
          {{ customer.email }}
        </td>
        <td
          data-label="creation_date"
          class="lg:w-1 whitespace-nowrap"
        >
          <small
            class="text-gray-500 dark:text-slate-400"
            :title="customer.creation_date"
            >{{ customer.creation_date_formatted }}</small
          >
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <BaseButton
              color="bg-blue-500 text-white"
              :icon="mdiPen"
              small
              outline
              @click="showUpdateCustomerModal(customer)"
            />
            <BaseButton
              color="bg-red-500 text-white"
              :icon="mdiTrashCan"
              small
              @click="showRemoveCustomerModal(customer)"
            />
          </BaseButtons>
        </td>
      </tr>
      <tr v-else>
        <td>Loading...</td>
      </tr>
    </tbody>
  </table>
</template>
