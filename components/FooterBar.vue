<script setup>
import { containerMaxW } from '~/configs/config'
import BaseLevel from '~/components/BaseLevel.vue'
import JustboilLogo from '~/components/JustboilLogo.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="py-2 px-6"
    :class="containerMaxW"
  >
    <BaseLevel>
      <div class="text-center md:text-left">
        <b>&copy;{{ year }} </b>
        <slot />
      </div>
    </BaseLevel>
  </footer>
</template>
