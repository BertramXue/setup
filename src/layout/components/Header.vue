<script setup lang="ts">
import { IxMenu } from '@idux/components/menu'
import { computed } from 'vue'
import { RouteRecordRaw, useRoute, type RouteLocationMatched } from 'vue-router'

const route = useRoute()

const generateCurMenus: any = (routers: RouteLocationMatched[] | RouteRecordRaw[]) =>
  routers.map((item: RouteLocationMatched | RouteRecordRaw) => {
    return {
      label: item.meta?.title,
      key: item.path,
      disabled: item.path === '/',
      children:
        item.children && item.children.length > 0 ? generateCurMenus(item.children) : undefined,
    }
  })

const breadcrumbList = computed(() => {
  return generateCurMenus(route.matched)
})
</script>
<template>
  <div class="main-content__header">
    <IxBreadcrumb>
      <IxBreadcrumbItem v-for="menuItem in breadcrumbList" :key="menuItem.key">
        <IxDropdown v-if="menuItem.children">
          <router-link :to="menuItem.key" class="ix-dropdown-trigger">
            <span>
              {{ menuItem.label }}
            </span>
          </router-link>

          <template #overlay>
            <IxMenu :dataSource="menuItem.children" />
          </template>
        </IxDropdown>

        <div v-else>
          {{ menuItem.label }}
        </div>
      </IxBreadcrumbItem>
    </IxBreadcrumb>
  </div>
</template>

<style lang="less" scoped>
.main-content__header {
  height: 48px;
  background-color: #fff;
  box-shadow: inset 0px -1px 0px 0px #e1e5eb;
  font-size: 14px;
  font-weight: bold;
  color: #000;
  line-height: 20px;
  padding: 14px 24px;

  .main-content__back-icon {
    cursor: pointer;
  }
}
</style>
