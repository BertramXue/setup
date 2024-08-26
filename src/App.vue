<script setup lang="ts">
import { IduxProvider } from './components/idux-provider'
import IduxLayout from './layout/IduxLayout.vue';
</script>

<template>
  <IduxProvider>
    <IduxLayout />
  </IduxProvider>
</template>
