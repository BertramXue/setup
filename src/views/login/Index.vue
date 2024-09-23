<script setup lang="ts">
import { type LineChartProps, useLineStyleColor, getAlphaColor, BarChartProps, PieChartProps } from '@idux/charts'
import { ref } from 'vue'
import { SelectData } from '@idux/components/select'

const lineOption: LineChartProps = {
  // smooth: true,
  title: { text: '折线图标题' },
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    name: '次',
  },
  series: [
    {
      data: [100, 150, 300, 88, 200],
      name: '到店靓仔',
      showSymbol: false,
      lineStyle: {
        shadowColor: getAlphaColor('#458FFF', 0.9), // 等同 rgba(69, 143, 255, 0.9)
        shadowBlur: 8,
        color: useLineStyleColor('#458FFF'),
      },
    },
    {
      data: [55, 88, 150, 120, 65],
      name: '到店靓女',
      showSymbol: false,
      lineStyle: {
        shadowColor: getAlphaColor('#20cc94', 0.9), // 等同 rgba(69, 143, 255, 0.9)
        shadowBlur: 8,
        color: useLineStyleColor('#20cc94')
      }
    },
  ],
}

const barOption: BarChartProps = {
  title: { text: '柱状图标题' },
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    name: '次',
  },
  series: [
    {
      data: [100, 150, 300, 88, 200],
      name: '到店靓仔',
    },
    {
      data: [55, 88, 150, 120, 65],
      name: '到店靓女',
    },
  ],
}

const xDataSource: SelectData[] = [
  { key: 'line1', label: '时间' },
]

const yDataSource: SelectData[] = [
  { key: 'line1', label: '网店交易额' },
  { key: 'pie1', label: '退款金额' },
  { key: 'bar1', label: '环比增长' },
  { key: 'SKU', label: 'SKU' },
  { key: 'ASIN', label: 'ASIN' },
]

const typeDataSource: SelectData[] = [
  { key: 'line1', label: '店铺' },
]

const selectDataSource: RadioData[] = [
  { key: 'line', label: '折线图' },
  { key: 'pie', label: '饼图' },
  { key: 'bar', label: '柱状图' },
  { key: 'mix', label: '折线图 + 柱状图' },
]

const data = [
  { value: 145, name: '图例A' },
  { value: 124, name: '图例B' },
  { value: 118, name: '图例C' },
  { value: 110, name: '图例D' },
  { value: 104, name: '图例E' },
  { value: 92, name: '图例F' },
]

const pieOption: PieChartProps = {
  name: '基础饼图',
  radius: '80%',
  title: {
    top: '8%',
    left: '80%',
  },
  legend: {
    top: '30%',
    left: '80%',
  },
}

const value = ref('line')

const valueX = ref('line1')
const valueY = ref(['line1'])
const valueType = ref('line1')

import { useFormControl, useFormGroup } from '@idux/cdk/forms'
import { RadioData } from '@idux/components/radio'
import { TagSelectData } from '@idux/pro/tag-select'

const controlLength = 12
const formGroup = useFormGroup<Record<string, unknown>>({})

for (let index = 1; index <= controlLength; index++) {
  const control = useFormControl()
  formGroup.addControl(`field${index}`, control)
}

const selectedValue = ref<string[]>([])
const tagSelectData = ref<TagSelectData[]>([
  {
    key: 'emphasis',
    label: '网店交易额',
    color: 'yellow',
  },
  {
    key: 'alarm',
    label: '退款金额',
    color: 'blue',
  },
  {
    key: 'track',
    label: '环比增长',
    color: 'orange',
  },
  {
    key: 'care-and-track',
    label: 'SKU',
    color: 'green',
  },
  {
    key: 'keeps-alarm',
    label: 'ASIN',
    color: 'red',
  },
])

const handleTagDataRemove = (data: TagSelectData) => {
  tagSelectData.value = tagSelectData.value.filter(d => d.key !== data.key)
}
const handleTagDataAdd = (data: TagSelectData) => {
  tagSelectData.value.push(data)
}
const handleTagDataChange = (data: TagSelectData) => {
  const index = tagSelectData.value.findIndex(d => d.key === data.key)
  if (index < 0) {
    return
  }

  tagSelectData.value.splice(index, 1, data)
}

</script>
<template>
  <div class="page-content">
    <IxRow gutter="24">
      <IxCol span="4">
        <IxButton mode="primary" style="margin-right: 8px;">导入</IxButton>
        <IxButton>导出</IxButton>
      </IxCol>
    </IxRow>
    <IxRow gutter="24">
      <IxCol span="4">
        <IxFormItem label="X轴">
          <IxSelect v-model:value="valueX" :dataSource="xDataSource" style="width: 100%"></IxSelect>
        </IxFormItem>
      </IxCol>
      <!-- <IxCol span="4">
        <IxFormItem label="X轴单位">
          <IxInput></IxInput>
        </IxFormItem>
      </IxCol> -->
      <IxCol span="6">
        <IxFormItem label="Y轴">
          <!-- <IxSelect v-model:value="valueY" :dataSource="yDataSource" style="width: 100%" multiple></IxSelect> -->
          <IxProTagSelect v-model:value="valueY" placeholder="请选择标签" :dataSource="tagSelectData"
            :onTagDataRemove="handleTagDataRemove" :onTagDataAdd="handleTagDataAdd"
            :onTagDataChange="handleTagDataChange">
            <template #removeConfirmTitle="{ label }"> 确定删除“{{ label }}”标签吗？ </template>
          </IxProTagSelect>
        </IxFormItem>
      </IxCol>
      <!-- <IxCol span="4">
        <IxFormItem label="Y轴单位">
          <IxInput></IxInput>
        </IxFormItem>
      </IxCol> -->
      <IxCol span="4">
        <IxFormItem label="类型">
          <IxSelect v-model:value="valueType" :dataSource="typeDataSource" style="width: 100%"></IxSelect>
        </IxFormItem>
      </IxCol>
      <IxCol span="4">
        <IxFormItem label="标题">
          <IxInput></IxInput>
        </IxFormItem>
      </IxCol>
    </IxRow>
    <!-- <IxRow gutter="24">
      <IxCol span="4">
        <IxFormItem label="标题">
          <IxInput></IxInput>
        </IxFormItem>
      </IxCol>
    </IxRow> -->
    <IxRow gutter="24">
      <IxCol span="6">
        <IxFormItem label="图表类型" class="chart-type">
          <IxRadioGroup v-model:value="value" :dataSource="selectDataSource"></IxRadioGroup>
        </IxFormItem>
      </IxCol>
    </IxRow>
  </div>
  <IxLineChart v-show="value === 'line'" style="height: calc(100% - 180px)" v-bind="lineOption" />
  <IxBarChart v-show="value === 'bar'" style="height: calc(100% - 180px)" v-bind="barOption" />
  <IxPieChart v-show="value === 'pie'" style="height: calc(100% - 180px); margin: 0 auto;" :data="data"
    v-bind="pieOption" />
</template>
<style lang="less" scoped>
.page-content {
  :deep(.ix-form-item-label label) {
    vertical-align: -6px;
  }

  .chart-type {
    :deep(label) {
      vertical-align: 0;
    }
  }
}
</style>
