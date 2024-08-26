<template>
  <IxProLayout :activeKey="activeKey" :menus="menus" type="sider" theme="dark" :logo="logo" fixed class="pro-layout">
    <template #itemLabel="item">
      <router-link :to="item.key">{{ item.label }}</router-link>
    </template>
    <template #siderFooter>
      <IxLayoutSiderTrigger />
    </template>
    <div class="content">
      <Header />
      <Main />
    </div>
  </IxProLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import type { MenuData } from '@idux/components/menu'
import Logo from '@/assets/logo.svg'
import Header from '@/layout/components/Header.vue'
import Main from '@/layout/components/Main.vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import routes from '@/router/routes'
import { normalizePath } from '@/utils'

const menus = ref<MenuData[]>([])
const activeKey = computed(() => route.path)
const route = useRoute()

const logo = {
  image: Logo,
  title: 'Pro Layout',
};

onMounted(() => {
  menus.value = walkMenus(routes, '/')
})

/**
 * traverse
 */
function walkMenus(routes: RouteRecordRaw | RouteRecordRaw[], parentPath: string) {
  let data: RouteRecordRaw[] = []
  const dataSource: MenuData[] = []

  if (!Array.isArray(routes)) {
    data = [routes]
  } else {
    data = routes
  }
  data.forEach(item => {
    const copy = cloneDeep(item)
    const { children, meta: { title = '', icon = undefined } = {} } = copy

    const _path = normalizePath(parentPath + '/' + item.path)

    if (children) {
      dataSource.push({
        type: 'sub',
        label: title,
        key: _path,
        icon: icon,
        children: walkMenus(children, _path),
      })
    } else {
      dataSource.push({
        type: 'item',
        label: title,
        key: _path,
        icon: icon,
      })
    }
  })
  return dataSource
}
</script>

<style lang="less" scoped>
.pro-layout {
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  :deep(.ix-pro-layout-content) {
    padding: 0 !important;
  }
}
</style>

