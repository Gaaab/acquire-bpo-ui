<script lang="ts" setup>
import { useRouter } from '#app'
import { reactive, ref } from 'vue'
import { mdiAccount, mdiAsterisk, mdiInformation } from '@mdi/js'
import SectionFullScreen from '~/components/SectionFullScreen.vue'
import LayoutGuest from '~/layouts/LayoutGuest.vue'
import CardBox from '~/components/CardBox.vue'
import FormCheckRadio from '~/components/FormCheckRadio.vue'
import FormField from '~/components/FormField.vue'
import FormControl from '~/components/FormControl.vue'
import BaseButton from '~/components/BaseButton.vue'
import BaseButtons from '~/components/BaseButtons.vue'
import Notification from '~/components/Notification.vue'
import type { Credentials, NotificationVariantType } from '~/types'
import { useAuthStore } from '~/store'

const form = reactive<Credentials>({
  email: 'test@example.com',
  password: 'password',
  remember: false,
})

const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const isNotificationVisible = ref(false)
const notificationMessage = ref('')
const notificationVariant = ref<NotificationVariantType>('error')

const submit = async () => {
  try {
    isNotificationVisible.value = false
    loading.value = true
    await authStore.login(form)
    router.replace('/dashboard')
  } catch (error: any) {
    console.error(error)
    notificationMessage.value = error?.response?.data?.message || 'These credentials does not exists on our records...'
    notificationVariant.value = 'error'
    isNotificationVisible.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen
      v-slot="{ cardClass }"
      bg="purplePink"
    >
      <CardBox
        :class="cardClass"
        is-form
        @submit.prevent="submit"
      >
        <Notification
          v-if="isNotificationVisible"
          title="Log in failed"
          :message="notificationMessage"
          :variant="notificationVariant"
          :duration="5000"
          @close="isNotificationVisible = false"
        >
          <template #icon>
            <BaseIcon :path="mdiInformation" />
          </template>
        </Notification>
        <FormField
          label="Login"
          help="Please enter your login"
        >
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="email"
            autocomplete="email"
            type="email"
            required
          />
        </FormField>

        <FormField
          label="Password"
          help="Please enter your password"
        >
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
            required
          />
        </FormField>

        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton
              :disabled="loading"
              type="submit"
              color="info"
              outline
              label="Login"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
