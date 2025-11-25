<template>
  <div>
    <div class="text-h6 q-mb-md">账号信息</div>
    <div class="text-h6 q-mb-md">第三方账号绑定</div>
    <div class="text-body2 q-mb-md">
      使用以下任一方式都可以登录到您的帐号，避免由于某个帐号失效导致无法登录
    </div>
    <q-table
      :rows="tableRows"
      :columns="columns"
      :row-key="rowKey"
      flat
      bordered
      hide-bottom
      :loading="loading"
    >
      <template #body-cell-source="props">
        <q-td key="source" :props="props">
          <q-avatar size="30px">
            <img :src="getImage(props.row.source)" />
          </q-avatar>
        </q-td>
      </template>
      <template #body-cell-bound="props">
        <q-td key="bound" :props="props">
          <h-binding-status-column :bound="props.row.bound"></h-binding-status-column>
        </q-td>
      </template>
      <template #body-cell-detail="props">
        <q-td key="detail" :props="props">
          <h-binding-detail-column :item="props.row"></h-binding-detail-column>
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td key="actions" :props="props">
          <h-binding-button :item="props.row"></h-binding-button>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from 'vue';

import type {
  AccessSourceEntity,
  AccessSourceConditions,
  AccessSourceProps,
  QTableColumnProps,
} from '@/lib/declarations';

import { CONSTANTS, IMAGES, API } from '@/configurations';
import { useTable } from '@/hooks';
import { useAuthenticationStore } from '@herodotus-cloud/framework-kernel';
import { moment } from '@/lib/utils';

import HBindingButton from './HBindingButton.vue';
import HBindingDetailColumn from './HBindingDetailColumn.vue';
import HBindingStatusColumn from './HBindingStatusColumn.vue';

export default defineComponent({
  name: 'HBindingList',

  components: {
    HBindingButton,
    HBindingDetailColumn,
    HBindingStatusColumn,
  },

  setup() {
    const store = useAuthenticationStore();

    const { tableRows, pagination, loading, findItems, conditions } = useTable<
      AccessSourceEntity,
      AccessSourceConditions
    >(API.core.socialBinding(), CONSTANTS.ComponentName.SOCIAL_BINDING, true);

    const rowKey: AccessSourceProps = 'id';

    const columns: QTableColumnProps = [
      {
        name: 'index',
        label: '序号',
        field: 'index',
      },
      { name: 'source', field: 'source', align: 'center', label: 'Logo' },
      { name: 'description', field: 'description', align: 'center', label: '绑定账号' },
      { name: 'detail', field: 'detail', align: 'center', label: '详情' },
      {
        name: 'bindingTime',
        field: 'bindingTime',
        align: 'center',
        label: '绑定时间',
        format: (value) => (value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''),
      },
      { name: 'bound', field: 'bound', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];

    const getImage = (source: string) => {
      const name = source.toLowerCase();
      return IMAGES.getSocialLogo(name);
    };

    onMounted(() => {
      conditions.value.userId = store.userId;
      findItems({ pagination: pagination.value, getCellValue: (col: any, row: any) => {} });
    });

    watch(tableRows, (newValue) => {
      if (newValue) {
        newValue.forEach((row, index) => {
          //@ts-ignore
          row.index = index + 1;
        });
      }
    });

    return { tableRows, columns, rowKey, pagination, loading, getImage };
  },
});
</script>
