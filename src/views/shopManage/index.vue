<template>
  <div vertical class="page-content">
    <IxLayout>
      <IxLayoutSider style="display: flex" v-model:collapsed="collapsed">
        <IxProTree class="sider-tree" placeholder="搜索" :dataSource="treeData" v-model:expandedKeys="expandedKeys">
          <template #header>
            <IxHeader size="sm">
              筛选组
            </IxHeader>
          </template>
        </IxProTree>
      </IxLayoutSider>
      <IxLayoutContent class="layout-content">
        <div class="toolbar-content">
          <IxRow justify="space-between">
            <IxCol :span="4">
              <IxSpace align="center">
                <IxUpload v-model:files="files" action="" style="margin-top: 2px">
                  <IxButton mode="primary">导入</IxButton>
                  <template #list>
                  </template>
                </IxUpload>
                <IxButton @click="visible = !visible">导出</IxButton>
                <IxButton @click="tagVisible = !tagVisible">标签管理</IxButton>
              </IxSpace>
            </IxCol>
            <IxCol :span="20">
              <IxSpace align="center" style="float: right">
                <IxCascader v-model:value="queryFullPathValue" multiple :dataSource="queryDataSource" style="width: 200px" />
                <IxCascader v-model:value="fullPathValue" multiple :dataSource="dataSource" style="width: 200px" />
                <IxDateRangePicker v-model:value="monthValue" type="month" clearable></IxDateRangePicker>
                <IxInput v-model:value="valueRef">
                  <template #suffix>
                    <IxIcon name="search" />
                  </template>
                </IxInput>
                <IxButton icon="reload"></IxButton>
                <IxButton icon="link" @click="jumpPage"></IxButton>
                <IxPopover v-model:visible="popoverVisible" header="收藏" closable placement="bottomEnd" trigger="manual">
                  <template #content>
                    <IxForm class="demo-form" :control="exportFormGroup" labelCol="6">
                      <IxFormItem label="条件名" required>
                        <IxInput control="contact"></IxInput>
                      </IxFormItem>
                    </IxForm>
                  </template>
                  <IxButton icon="star" @click="popoverVisible = !popoverVisible"></IxButton>
                </IxPopover>
              </IxSpace>
            </IxCol>
          </IxRow>
        </div>
        <div class="table-content">
          <IxFormWrapper :control="formGroup">
            <IxProTable autoHeight :columns="columns" :dataSource="data" :pagination="{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSize: 5000,
              pageSizes: [100, 200, 1000, 5000]
            }">
              <template #sku="{ value, record }">
                <IxFormItem v-if="beingEditedDataKeys.has(record.key)" messageTooltip>
                  <IxInput :control="formGroup.get([record.key, 'sku'])"></IxInput>
                </IxFormItem>
                <span v-else>{{ value }}</span>
              </template>

              <template #asin="{ value, record }">
                <IxFormItem v-if="beingEditedDataKeys.has(record.key)" messageTooltip>
                  <IxInput :control="formGroup.get([record.key, 'asin'])"></IxInput>
                </IxFormItem>
                <span v-else>{{ value }}</span>
              </template>

              <template #price="{ value, record }">
                <IxFormItem v-if="beingEditedDataKeys.has(record.key)" messageTooltip>
                  <IxInput :control="formGroup.get([record.key, 'price'])"></IxInput>
                </IxFormItem>
                <span v-else>{{ value }}</span>
              </template>

              <template #perCustomer="{ value, record }">
                <IxFormItem v-if="beingEditedDataKeys.has(record.key)" messageTooltip>
                  <IxInput :control="formGroup.get([record.key, 'perCustomer'])"></IxInput>
                </IxFormItem>
                <span v-else>{{ value }}</span>
              </template>

              <template #sale="{ value, record }">
                <IxFormItem v-if="beingEditedDataKeys.has(record.key)" messageTooltip>
                  <IxInput :control="formGroup.get([record.key, 'sale'])"></IxInput>
                </IxFormItem>
                <span v-else>{{ value }}</span>
              </template>

              <template #batch="{ value, record }">
                <IxFormItem v-if="beingEditedDataKeys.has(record.key)" messageTooltip>
                  <IxInput :control="formGroup.get([record.key, 'batch'])"></IxInput>
                </IxFormItem>
                <span v-else>{{ value }}</span>
              </template>

              <template #lastBatch="{ value, record }">
                <IxFormItem v-if="beingEditedDataKeys.has(record.key)" messageTooltip>
                  <IxInput :control="formGroup.get([record.key, 'lastBatch'])"></IxInput>
                </IxFormItem>
                <span v-else>{{ value }}</span>
              </template>

              <template #lastSale="{ value, record }">
                <IxFormItem v-if="beingEditedDataKeys.has(record.key)" messageTooltip>
                  <IxInput :control="formGroup.get([record.key, 'lastSale'])"></IxInput>
                </IxFormItem>
                <span v-else>{{ value }}</span>
              </template>

              <template #tags="{ value }">
                <IxTag status="info" v-for="item of value">{{ item }}</IxTag>
              </template>

              <template #action="{ record }">
                <IxButtonGroup :gap="16" mode="link">
                  <template v-if="beingEditedDataKeys.has(record.key)">
                    <IxButton @click="onSave(record)">保存</IxButton>
                    <IxButton @click="onCancel(record)">取消</IxButton>
                  </template>
                  <template v-else>
                    <IxButton @click="onEdit(record)">编辑</IxButton>
                  </template>
                </IxButtonGroup>
              </template>
            </IxProTable>
          </IxFormWrapper>
        </div>
      </IxLayoutContent>
    </IxLayout>
    <IxModal v-model:visible="visible" header="导出配置">
      <IxForm class="demo-form" :control="exportFormGroup" labelCol="6">
        <IxFormItem label="文件名称" required>
          <IxInput control="contact"></IxInput>
        </IxFormItem>
        <IxFormItem label="标题名称" required>
          <IxInput control="contact"></IxInput>
        </IxFormItem>
        <IxFormItem :controlCol="{ offset: 6 }" messageTooltip>
          <IxCheckbox control="subscribe">汇总</IxCheckbox>
        </IxFormItem>
      </IxForm>
    </IxModal>
    <IxModal v-model:visible="tagVisible" header="标签管理">
      <IxForm class="demo-form" :control="exportFormGroup" labelCol="6">
        <IxFormItem label="标签" required>
          <IxSelect v-model:value="value" multiple :dataSource="tagDataSource" :overlayRender="overlayRender"
            style="width: 100%">
          </IxSelect>
        </IxFormItem>
      </IxForm>
    </IxModal>
  </div>
</template>

<script lang="ts" setup>
import { IxButton } from '@idux/components/button'
import { IxTag } from '@idux/components/tag'
import { ProTableColumn } from '@idux/pro/table'

import { h, ref, VNode } from 'vue'
import { Router } from 'vue-router'


import { AbstractControl, ValidateErrors, Validators, useFormControl, useFormGroup } from '@idux/cdk/forms'
import { CascaderData } from '@idux/components/cascader'
import { VKey } from '@idux/cdk'
import { isString, uniqueId } from 'lodash-es'
import { IxDivider, IxInput, SelectData } from '@idux/components'

import JsonData from './output.json';

const monthValue = ref(['2022-01', '2022-06'])

import { useRouter } from 'vue-router'

const router = useRouter()
const jumpPage = () => {
  router.push('/overview')
};

const files = ref([])

const visible = ref(false)
const tagVisible = ref(false)
const popoverVisible = ref(false)

const collapsed = ref(false);

const expandedKeys = ref(['0'])

const treeData = [
  {
    label: '全部',
    key: '0',
    children: [
      {
        label: '美洲地区',
        key: '0-0-0',
      },
      {
        label: '亚太地区',
        key: '0-0-1',
      },
      { label: '欧洲地区', key: '0-1-0' },
      { label: '非洲地区', key: '0-1-1' },
    ],
  },
]

interface Data {
  key?: number
  sku?: string
  asin?: string
  price?: number
  batch?: number
  sale?: number
  perCustomer?: number
  lastBatch?: number
  lastSale?: number
  shelfTime?: string
  tags: string[]
  editable?: 'price'
}

const columns: ProTableColumn<Data>[] = [
  {
    type: 'selectable',
    align: 'center',
    multiple: true,
    fixed: 'start',
  },
  {
    title: '地区',
    dataKey: 'area',
    width: 100,
    customCell: ({ value }: { value: string }) => {
      return value || '-';
    },
    sortable: {},
  },
  {
    title: '国家',
    dataKey: 'nation',
    width: 100,
    customCell: ({ value }: { value: string }) => {
      return value || '-';
    },
    sortable: {},
  },
  {
    title: '店铺名',
    dataKey: 'shopName',
    width: 150,
    sortable: {},
    fixed: 'start',
  },
  {
    title: '网店交易额',
    dataKey: 'onlineStoreRevenue',
    customCell: 'onlineStoreRevenue',
    width: 120,
    sortable: {}
  },
  {
    title: '退款金额',
    dataKey: 'refundAmount',
    customCell: 'refundAmount',
    width: 150,
    sortable: {}
  },
  {
    title: '环比增长',
    dataKey: 'monthOnMonthGrowth',
    customCell: 'monthOnMonthGrowth',
    width: 150,
    sortable: {}
  },
  {
    title: '平台佣金',
    dataKey: 'platformCommission',
    customCell: 'platformCommission',
    width: 150,
    sortable: {}
  },
  {
    title: '销售额',
    dataKey: 'sales',
    customCell: 'sales',
    width: 150,
    sortable: {}
  },
  {
    title: '运费',
    dataKey: 'shippingFee',
    customCell: 'shippingFee',
    width: 150,
    sortable: {}
  },
  {
    title: '产品成本',
    dataKey: 'productCost',
    customCell: 'productCost',
    width: 150,
    sortable: {}
  },
  {
    title: '广告费用',
    dataKey: 'advertisingCost',
    customCell: 'advertisingCost',
    width: 150,
    sortable: {}
  },
  {
    title: '头程费用',
    dataKey: 'firstLegFee',
    customCell: 'firstLegFee',
    width: 150,
    sortable: {}
  },
  {
    title: 'VAT费用',
    dataKey: 'vat',
    customCell: 'vat',
    width: 150,
    sortable: {}
  },
  {
    title: '其他杂费',
    dataKey: 'other',
    customCell: 'other',
    width: 150,
    sortable: {}
  },
  {
    title: '拍摄成本',
    dataKey: 'photo',
    customCell: 'photo',
    width: 150,
    sortable: {}
  },
  {
    title: '毛利',
    dataKey: 'grossProfit',
    customCell: 'grossProfit',
    width: 150,
    sortable: {}
  },
  {
    title: '毛利率',
    dataKey: 'grossProfitMargin',
    customCell: 'grossProfitMargin',
    width: 150,
    sortable: {}
  },
  {
    title: '订单数',
    dataKey: 'orderCount',
    customCell: 'orderCount',
    width: 150,
    sortable: {}
  },
  {
    title: '月份',
    dataKey: 'month',
    customCell: 'month',
    width: 150,
    sortable: {}
  },
  {
    title: '操作',
    key: 'action',
    customCell: 'action',
    width: 150,
    fixed: 'end',
  },
]

const children = columns.map(item => ({ key: item.dataKey, label: item.title })).filter(item => (!['action'].includes(item.key) && item.key))

const queryDataSource: CascaderData[] = [
  {
    key: 'components',
    label: '聚合',
    children,
  },
  {
    key: 'pro',
    label: '汇总',
    children,
  },
]


const data = ref<Data[]>([...JsonData])

const valueRef = ref('')

const fullPathValue = ref([
  ['components', 'general'],
])

const queryFullPathValue = ref([
  [],
])

const dataSource: CascaderData[] = [
  {
    key: 'components',
    label: '材质',
    children: [
      {
        key: 'general',
        label: '滴油',
      },
      {
        key: 'layout',
        label: '藏银',
      }
    ],
  },
  {
    key: 'pro',
    label: '产品类型',
    children: [
      {
        key: 'pro-layout',
        label: '吊坠',
      },
      {
        key: 'pro-table',
        label: '珠子',
      },
    ],
  },
]

const { required, range } = Validators

const formGroup = useFormGroup<Record<VKey, Data>>({})

const beingEditedDataKeys = ref<Set<string>>(new Set())

const createRecordGroup = (record: Data) => {
  const formGroup = useFormGroup<Partial<Data>>(
    {
      key: [record.key],
      sku: [record.sku, [required]],
      asin: [record.asin, [required]],
      price: [record.price, [required]],
      batch: [record.batch, [required]],
      sale: [record.sale, [required]],
      perCustomer: [record.perCustomer, [required]],
      lastBatch: [record.lastBatch, [required]],
      lastSale: [record.lastSale, [required]],
    },
    { trigger: 'interactions' },
  )

  // 注意，若版本为 1.x 不支持 interactions ,则需要手动对已填写列进行 markAsDirty 从而触发飘红

  // const sidControl = formGroup.get('sid')!
  // const genderControl = formGroup.get('gender')!
  // genderControl.watchValue(() => sidControl.validate())

  return formGroup
}

const exportFormGroup = useFormGroup({
  method: ['email', required],
  contact: ['', [required]],
  subscribe: [true],
})

const addKeyPrefix = 'ADD_TABLE_KEY'

const spinning = ref(false)

const onSave = (record: Data) => {
  const currRecordGroup = formGroup.get(record.key!)
  if (currRecordGroup.valid.value) {
    const formValue = currRecordGroup.getValue()
    spinning.value = true
    // 判断是否为新增
    if (isString(record.key) && record.key.startsWith(addKeyPrefix)) {
      // 调用新增接口, 参数中可能需要去掉 key
      console.log('add', formValue)
    } else {
      // 调用修改的接口
      console.log('edit', formValue)
    }

    // 请求成功后，刷新数据，只更新当前行的数据
    setTimeout(() => {
      const copyData = [...data.value]
      const targetIndex = copyData.findIndex(item => item.key === record.key)

      copyData.splice(targetIndex, 1, {
        ...formValue,
        key: formValue.key.startsWith(addKeyPrefix) ? uniqueId('ADDED') : formValue.key,
      })
      data.value = copyData
      formGroup.removeControl(record.key as never)
      beingEditedDataKeys.value.delete(record.key)
      spinning.value = false
    }, 1000)
  } else {
    currRecordGroup.markAsDirty()
  }
}

const onCancel = (record: Data) => {
  // 判断是否为新增
  if (isString(record.key) && record.key.startsWith(addKeyPrefix)) {
    data.value = data.value.filter(item => item.key !== record.key)
  } else {
    beingEditedDataKeys.value.delete(record.key)
  }
  formGroup.removeControl(record.key as never)
}

const onEdit = (record: Data) => {
  formGroup.setControl(record.key!, createRecordGroup(record))
  beingEditedDataKeys.value.add(record.key)
}

const tagDataSource = ref<SelectData[]>([
  { key: 'tom', label: '滴油' },
  { key: 'jerry', label: '吊坠' },
  { key: 'speike', label: '新年' },
])

const value = ref(['tom', 'jerry'])

const inputValue = ref('')
const onChange = (value: string) => {
  inputValue.value = value
}
const onAdd = () => {
  const currOptions = tagDataSource.value
  const label = inputValue.value
  tagDataSource.value = [...currOptions, { key: label, label, value: label }]
  inputValue.value = ''
}

const overlayRender = (children: VNode[]) => {
  const divider = h(IxDivider)
  const input = h(IxInput, { style: { width: '100px' }, value: inputValue.value, onChange: onChange })
  const button = h(IxButton, { icon: 'plus', onClick: onAdd }, () => 'Add')
  const addItem = h('div', { style: { display: 'flex', padding: '0 16px 8px', gap: '8px' } }, [input, button])
  return h('div', [children, divider, addItem])
}
</script>

<style lang="less" scoped>
.page-content {
  height: 100%;
  padding: 0;
  background-color: #fff;

  .layout-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 16px;
    background-color: #fff;
  }

  .toolbar-content {
    padding: 8px 0;

    :deep(.ix-upload-tip) {
      margin: 0;
    }
  }

  .table-content {
    flex: 1;

    .edit-cell {
      .ix-icon {
        visibility: hidden;
        margin-left: 16px;
      }

      &:hover {
        .ix-icon {
          cursor: pointer;
          visibility: visible;
        }
      }
    }
  }
}
</style>