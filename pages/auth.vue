<script lang="ts" setup>
import { useRouter } from '#app'
import { reactive, ref } from 'vue'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '~/components/SectionFullScreen.vue'
import LayoutGuest from '~/layouts/LayoutGuest.vue'
import CardBox from '~/components/CardBox.vue'
import FormCheckRadio from '~/components/FormCheckRadio.vue'
import FormField from '~/components/FormField.vue'
import FormControl from '~/components/FormControl.vue'
import BaseButton from '~/components/BaseButton.vue'
import BaseButtons from '~/components/BaseButtons.vue'
import type { Credentials } from '~/types'
import { useAuthStore } from '~/store'

const form = reactive<Credentials>({
  email: 'test@example.com',
  password: 'password',
  remember: false,
})

const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const submit = async () => {
  try {
    loading.value = true
    await authStore.login(form)
    router.replace('/dashboard')
  } catch (error) {
    console.error(error)
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
        <FormField
          label="Login"
          help="Please enter your login"
        >
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
            type="email"
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
