<script lang="ts" setup>
import { useHead } from '#imports'

useHead({
  titleTemplate: (titleChunk) => {
    const titleBase = 'Acquire BPO Exam'
    return titleChunk ? `${titleChunk} - ${titleBase}` : titleBase
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
