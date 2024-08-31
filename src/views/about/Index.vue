<template>
    <IxRow justify="end">
        <IxCol :span="2">
            <IxDatePicker v-model:value="monthValue" type="month" clearable></IxDatePicker>
        </IxCol>
    </IxRow>
    <IxList :header="`${monthValue}数据汇总`">
        <IxList-item v-for="item in listData" :key="item.title" :content="item.content" />
    </IxList>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const monthValue = ref('2024-08')

const listData: Record<string, unknown>[] = [
    {
        content: 'xxx本月销售额最高',
    },
    {
        content: 'xxx本月无销售额',
    },
    {
        content: 'xxx本月有上升趋势',
    },
    {
        content: 'xxx本月有下降趋势',
    },
    {
        content: 'xxx本年销售额最高',
    },
    {
        content: 'xxx本年无销售额',
    },
]
</script>

<style lang="less" scoped></style>