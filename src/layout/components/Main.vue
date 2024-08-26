<template>
  <div class="page-content">
    <router-view>
      <template #default="{ Component, route }">
        <transition>
          <keep-alive v-if="route.meta.keepAlive">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component v-else :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </router-view>
  </div>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="less" scoped>
.page-content {
  flex: 1;
  padding: 16px;
}
</style>