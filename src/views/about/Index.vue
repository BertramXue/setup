<template>
    <IxRow justify="space-between" class="top-bar-wrap">
        <IxCol :span="2">
            <IxButton mode="primary">立即更新</IxButton>
        </IxCol>
      <IxCol span="4">
        <IxFormItem label="地区">
          <IxSelect v-model:value="area" :dataSource="areaDataSource" style="width: 100%"></IxSelect>
        </IxFormItem>
      </IxCol>
      <IxCol span="4">
        <IxFormItem label="国家">
          <IxSelect v-model:value="nation" :dataSource="nationDataSource" style="width: 100%"></IxSelect>
        </IxFormItem>
      </IxCol>
      <IxCol span="4">
        <IxFormItem label="店铺">
          <IxSelect v-model:value="shop" :dataSource="shopDataSource" style="width: 100%"></IxSelect>
        </IxFormItem>
      </IxCol>
      <IxCol span="4">
        <IxFormItem label="标签">
          <IxSelect v-model:value="type" :dataSource="typeDataSource" style="width: 100%"></IxSelect>
        </IxFormItem>
      </IxCol>
    </IxRow>
    <!-- <IxList :header="`${monthValue}数据汇总`">
        <IxList-item v-for="item in listData" :key="item.title" :content="item.content" />
    </IxList> -->
    <IxRow :gutter="16" style="margin-top: 16px;" class="card-wrap">
        <IxCol xs="24" sm="8">
            <IxCard :header="{ title: '本月销售额最高'}" size="lg">
                <div>xxx公司本月销售额最高，达到了一个新的峰值。销售额有增长。xxx公司本月销售额最高，达到了一个新的峰值。销售额有增长。xxx公司本月销售额最高，达到了一个新的峰值。销售额有增长。</div>
            </IxCard>
        </IxCol>
        <IxCol xs="24" sm="8">
            <IxCard :header="{ title: '本月无销售额' }" size="lg">
                <div>xxx本月无销售额</div>
            </IxCard>
        </IxCol>
        <IxCol xs="24" sm="8">
            <IxCard :header="{ title: '本月有上升趋势' }" size="lg">
                <div>xxx本月有上升趋势</div>
            </IxCard>
        </IxCol>
        <IxCol xs="24" sm="8">
            <IxCard :header="{ title: '本月有下降趋势' }" size="lg">
                <div>xxx本月有下降趋势</div>
            </IxCard>
        </IxCol>
        <IxCol xs="24" sm="8">
            <IxCard :header="{ title: '本年销售额最高' }" size="lg">
                <div>xxx本年销售额最高</div>
            </IxCard>
        </IxCol>
        <IxCol xs="24" sm="8">
            <IxCard :header="{ title: '本年无销售额' }" size="lg">
                <div>xxx本年无销售额</div>
            </IxCard>
        </IxCol>
  </IxRow>
</template>

<script lang="ts" setup>
import { SelectData } from '@idux/components/select'
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

const area = ref('美洲')
const valueY = ref(['line1'])
const valueType = ref('line1')
const nation = ref('美国')
const shop = ref('CJ-DanLingJewelry')
const type = ref('珠宝')

const areaDataSource: SelectData[] = [
  { key: '美洲', label: '美洲' },
  { key: '亚太', label: '亚太' },
  { key: '欧洲', label: '欧洲' },
]

const nationDataSource: SelectData[] = [
  { key: '美国', label: '美国' },
  { key: '中国', label: '中国' },
  { key: '法国', label: '法国' },
]

const typeDataSource: SelectData[] = [
  { key: '服饰', label: '服饰' },
  { key: '珠宝', label: '珠宝' },
  { key: '美妆产品', label: '美妆产品' },
  { key: '数码产品', label: '数码产品' },
]

const shopDataSource: SelectData[] = [
  { key: 'CJ-DanLingJewelry', label: 'CJ-DanLingJewelry' },
  { key: 'CJ-DanLingJewelry UK', label: 'CJ-DanLingJewelry UK' },
]

</script>

<style lang="less" scoped>
.top-bar-wrap {
  :deep(.ix-form-item-label label) {
    vertical-align: -6px;
  }

  .chart-type {
    :deep(label) {
      vertical-align: 0;
    }
  }

}

.card-wrap {
  :deep(.ix-card-body) {
    height: 94px;
  }
}
</style>