<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import CardBoxModal from '~/components/CardBoxModal.vue'
import FormField from '~/components/FormField.vue'
import FormControl from '~/components/FormControl.vue'
import BaseButton from '~/components/BaseButton.vue'
import BaseButtons from '~/components/BaseButtons.vue'
import Notification from '~/components/Notification.vue'
import type { CustomerFormType } from '~/types'
import { mdiInformation } from '@mdi/js'

defineProps<CustomerFormType>()

const emit = defineEmits(['update:isModalActive', 'submit', 'close'])

const handleSubmit = () => emit('submit')

const handleCancel = () => emit('update:isModalActive', false)
</script>

<template>
  <CardBoxModal
    :model-value="isModalActive"
    :title="title"
    is-form
    has-cancel
    persistent
    @cancel="handleCancel"
    @submit="handleSubmit"
  >
    <Notification
      v-if="isNotificationVisible"
      :title="notificationTitle"
      :message="notificationMessage"
      :variant="notificationVariant"
      :duration="5000"
      @close="emit('close')"
    >
      <template #icon>
        <BaseIcon :path="mdiInformation" />
      </template>
    </Notification>

    <FormField label="First Name">
      <FormControl
        v-model="form.first_name"
        name="first_name"
        required
      />
    </FormField>

    <FormField label="Last Name">
      <FormControl
        v-model="form.last_name"
        name="last_name"
        required
      />
    </FormField>

    <FormField label="Email Address">
      <FormControl
        v-model="form.email"
        name="email"
        type="email"
        required
      />
    </FormField>

    <FormField label="Date of birth">
      <FormControl
        v-model="form.dob"
        name="date"
        type="date"
        required
      />
    </FormField>

    <FormField label="Age">
      <FormControl
        v-model="form.age"
        name="age"
        type="number"
        required
      />
    </FormField>

    <template #footer="{ cancel }">
      <BaseButtons class="py-4">
        <BaseButton
          label="Submit"
          type="submit"
          is="button"
          outline
          color="text-blue-500"
        />
        <BaseButton
          label="Cancel"
          @click="cancel"
        />
      </BaseButtons>
    </template>
  </CardBoxModal>
</template>
