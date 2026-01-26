<template>
  <div class="q-gutter-y-md">
    <h-compliance-condition v-model:conditions="conditions"></h-compliance-condition>
    <h-table
      :rows="tableRows"
      :columns="columns"
      :row-key="rowKey"
      selection="single"
      v-model:selected="selected"
      v-model:pagination="pagination"
      v-model:pageNumber="pagination.page"
      :totalPages="totalPages"
      :loading="loading"
      status
      reserved
      @request="findItems"
    >
      <template #top-left>
        <q-btn color="primary" label="导出Excel" @click="onExportExcel" />
      </template>

      <template #body-cell-mobile="props">
        <q-td key="mobile" :props="props">
          <h-boolean-column :value="props.row.mobile"></h-boolean-column>
        </q-td>
      </template>
      <template #body-cell-mobileBrowser="props">
        <q-td key="mobileBrowser" :props="props">
          <h-boolean-column :value="props.row.mobileBrowser"></h-boolean-column>
        </q-td>
      </template>
    </h-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type {
  OAuth2UserLoggingEntity,
  OAuth2UserLoggingConditions,
  OAuth2UserLoggingProps,
  QTableColumnProps,
  EntityTitle,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';
import { moment } from '@herodotus-cloud/core';
import { useTable, useXlsx } from '@/composables/hooks';

import { HTable, HBooleanColumn } from '@/components';
import { HComplianceCondition } from '@/components';

export default defineComponent({
  name: CONSTANTS.ComponentName.OAUTH2_COMPLIANCE,

  components: {
    HComplianceCondition,
    HTable,
    HBooleanColumn,
  },

  setup() {
    const { postExport } = useXlsx<OAuth2UserLoggingEntity>();
    const { tableRows, totalPages, pagination, loading, conditions, findItems } = useTable<
      OAuth2UserLoggingEntity,
      OAuth2UserLoggingConditions
    >(API.core.oauth2UserLogging(), CONSTANTS.ComponentName.OAUTH2_COMPLIANCE, false, {
      direction: 'DESC',
      properties: ['createTime'],
    });

    const selected = ref([]);
    const rowKey: OAuth2UserLoggingProps = 'loggingId';

    const dateFormat = (date: string) => {
      if (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '';
      }
    };

    const columns: QTableColumnProps = [
      { name: 'principalName', field: 'principalName', align: 'center', label: '用户名' },
      { name: 'clientId', field: 'clientId', align: 'center', label: '客户端ID' },
      { name: 'ip', field: 'ip', align: 'center', label: 'IP地址' },
      {
        name: 'location',
        field: 'location',
        align: 'center',
        label: '位置',
      },
      {
        name: 'mobile',
        field: 'mobile',
        align: 'center',
        label: '移动端？',
      },
      {
        name: 'mobileBrowser',
        field: 'mobileBrowser',
        align: 'center',
        label: '是移动端浏览器',
      },
      {
        name: 'platformName',
        field: 'platformName',
        align: 'center',
        label: '平台',
      },
      {
        name: 'osName',
        field: 'osName',
        align: 'center',
        label: '操作系统',
      },
      {
        name: 'browserName',
        field: 'browserName',
        align: 'center',
        label: '浏览器',
      },
      {
        name: 'browserEngineName',
        field: 'browserEngineName',
        align: 'center',
        label: '浏览器引擎',
      },
      {
        name: 'operation',
        field: 'operation',
        align: 'center',
        label: '操作',
      },
      {
        name: 'createTime',
        field: 'createTime',
        align: 'center',
        label: '时间',
        format: (value) => dateFormat(value),
      },
    ];

    const title: EntityTitle<OAuth2UserLoggingEntity> = {
      createTime: '创建时间',
      updateTime: '更新时间',
      loggingId: 'ID',
      principalName: '用户名',
      clientId: 'OAuth2 客户端ID',
      ip: 'IP地址',
      mobile: '是移动端 ?',
      browserName: '浏览器',
      mobileBrowser: '是移动端浏览器 ?',
      browserVersion: '浏览器版本',
      platformName: '平台',
      osName: '操作系统',
      osVersion: '操作系统版本',
      browserEngineName: '浏览器引擎',
      browserEngineVersion: '浏览器引擎版本',
      operation: '执行操作',
      location: '登录位置',
    };

    const onExportExcel = () => {
      postExport(tableRows.value, title, '日志审计');
    };

    return {
      rowKey,
      selected,
      pagination,
      columns,
      conditions,
      tableRows,
      totalPages,
      loading,
      findItems,
      onExportExcel,
    };
  },
});
</script>
