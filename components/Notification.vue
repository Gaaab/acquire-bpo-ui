<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
import type { NotificationVariantType } from '~/types'

const props = defineProps({
  title: { type: String, required: true },
  message: { type: String, required: true },
  variant: { type: String as PropType<NotificationVariantType>, default: 'error' },
  duration: { type: Number, default: 5000 }, // Duration in milliseconds
})

const isVisible = ref(true)

const closeNotification = () => {
  isVisible.value = false
}

const variantClass = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'bg-green-100 text-green-800'
    case 'error':
      return 'bg-red-100 text-red-800'
    case 'info':
      return 'bg-blue-100 text-blue-800'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return ''
  }
})

watch(isVisible, (val) => {
  if (val && props.duration > 0) {
    setTimeout(() => (isVisible.value = false), props.duration)
  }
})
</script>

<template>
  <div
    v-if="isVisible"
    :class="['flex items-center justify-between gap-4 p-4 rounded-lg shadow-lg', variantClass]"
    role="alert"
  >
    <div class="flex items-center gap-3">
      <slot name="icon" />
      <div>
        <p class="font-medium">{{ title }}</p>
        <p class="text-sm">{{ message }}</p>
      </div>
    </div>
    <button
      @click="closeNotification"
      class="text-gray-600 hover:text-gray-900 focus:outline-none"
    >
      <span class="sr-only">Dismiss</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>
