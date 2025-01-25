<script lang="ts" setup>
import { mdiCog, mdiCreation, mdiTableBorder } from '@mdi/js'
import CardBox from '~/components/CardBox.vue'
import SectionMain from '~/components/SectionMain.vue'
import LayoutAuthenticated from '~/layouts/LayoutAuthenticated.vue'
import TableCustomers from '~/components/TableCustomers.vue'
import { reactive, ref } from 'vue'
import { useCustomerStore } from '~/store'
import BaseButton from '~/components/BaseButton.vue'
import Notification from '~/components/Notification.vue'
import type { NotificationVariantType } from '~/types'
import CustomerFormModal from '~/components/CustomerFormModal.vue'

const isModalActive = ref(false)

// Move this somewhere
const customerStore = useCustomerStore()
const form = reactive({
  first_name: null,
  last_name: null,
  email: null,
  age: null,
  dob: null,
})

const isNotificationVisible = ref(false)
const notificationTitle = ref('')
const notificationMessage = ref('')
const notificationVariant = ref<NotificationVariantType>('error')

async function submit() {
  try {
    isNotificationVisible.value = false
    await customerStore.createCustomer(form)
    isModalActive.value = false
    // @TODO: Show success notification
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
    title="Create Customer"
    :form="form"
    :notificationTitle="notificationTitle"
    :notificationMessage="notificationMessage"
    :notificationVariant="notificationVariant"
    :isNotificationVisible="isNotificationVisible"
    @submit="submit"
  />

  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTableBorder"
        title="Customers"
        main
      >
        <BaseButton
          :icon="mdiCreation"
          color="whiteDark"
          @click="isModalActive = true"
        />
      </SectionTitleLineWithButton>
      <CardBox
        class="mb-6"
        has-table
      >
        <TableCustomers />
        <!--<TableSampleClients checkable />-->
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
