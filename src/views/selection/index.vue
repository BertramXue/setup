<template>
  <div vertical class="page-content">
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
        <IxCol :span="12">
          <IxSpace align="center" style="float: right">
            <IxCascader v-model:value="fullPathValue" multiple :dataSource="dataSource" style="width: 200px" />
            <IxDateRangePicker v-model:value="monthValue" type="month" clearable></IxDateRangePicker>
            <IxInput v-model:value="valueRef">
              <template #suffix>
                <IxIcon name="search" />
              </template>
            </IxInput>
            <IxButton icon="reload"></IxButton>
          </IxSpace>
        </IxCol>
      </IxRow>
    </div>
    <div class="table-content">
      <IxFormWrapper :control="formGroup">
        <IxProTable autoHeight :columns="columns" :dataSource="data">
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
          <IxSelect v-model:value="value" multiple :dataSource="tagDataSource" :overlayRender="overlayRender" style="width: 100%">
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

import { AbstractControl, ValidateErrors, Validators, useFormControl, useFormGroup } from '@idux/cdk/forms'
import { CascaderData } from '@idux/components/cascader'
import { VKey } from '@idux/cdk'
import { isString, uniqueId } from 'lodash-es'
import { IxDivider, IxInput, SelectData } from '@idux/components'

const monthValue = ref(['2022-01', '2022-06'])

const files = ref([])

const visible = ref(false)
const tagVisible = ref(false)

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
  },
  {
    title: 'SKU',
    dataKey: 'sku',
    customCell: 'sku',
    width: 150,
    sortable: {}
  },
  {
    title: 'ASIN',
    dataKey: 'asin',
    customCell: 'asin',
    width: 150,
  },
  {
    title: '价格（$）',
    dataKey: 'price',
    customCell: 'price',
    width: 120,
    sortable: {}
  },
  {
    title: '批量',
    dataKey: 'batch',
    customCell: 'batch',
    sortable: {}
  },
  {
    title: '销售额',
    dataKey: 'sale',
    customCell: 'sale',
    sortable: {}
  },
  {
    title: '客单价',
    dataKey: 'perCustomer',
    customCell: 'perCustomer',
    sortable: {}
  },
  {
    title: '对比上月批量',
    dataKey: 'lastBatch',
    customCell: 'lastBatch',
    sortable: {}
  },
  {
    title: '对比上月销售额',
    dataKey: 'lastSale',
    customCell: 'lastSale',
    sortable: {}
  },
  {
    title: '标签',
    dataKey: 'tags',
    customCell: 'tags',
    sortable: {}
  },
  {
    title: '上架时间',
    dataKey: 'shelfTime',
    sortable: {},
  },
  {
    title: 'Action',
    key: 'action',
    customCell: 'action',
    width: 150,
  },
]

const data = ref<Data[]>([])

const valueRef = ref('')

const fullPathValue = ref([
  ['components', 'general'],
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

for (let index = 0; index < 3; index++) {
  data.value.push({
    key: index,
    sku: `sku ${index}`,
    asin: `ASIN ${index}`,
    price: 18 + index,
    batch: 180 + index,
    sale: 180 + index,
    perCustomer: 20 + index,
    lastBatch: 90 + index,
    lastSale: 100 - + index,
    shelfTime: '2024-08-01',
    tags: ['滴油', '新年']
  })
}

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
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 16px;
  background-color: #fff;

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