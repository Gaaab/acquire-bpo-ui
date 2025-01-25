<script setup lang="ts">
//import { useMainStore } from '~/store/main'
import { computed } from 'vue'
import UserAvatar from '~/components/UserAvatar.vue'

const userAvatar = computed(
  () => `https://api.dicebear.com/7.x/avataaars/svg?seed=${'test@example.com'.replace(/[^a-z0-9]+/gi, '-')}`
)
</script>

<template>
  <UserAvatar
    :username="`user name`"
    :avatar="userAvatar"
  >
    <slot />
  </UserAvatar>
</template>
