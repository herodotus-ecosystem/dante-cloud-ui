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
    </h-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type {
  OAuth2ComplianceEntity,
  OAuth2ComplianceConditions,
  OAuth2ComplianceProps,
  QTableColumnProps,
  EntityTitle,
} from '@/lib/declarations';

import { ComponentNameEnum } from '@/lib/enums';
import { moment, api } from '@/lib/utils';
import { useTable, useXlsx } from '@/hooks';

import { HTable, HComplianceCondition } from '@/components';

export default defineComponent({
  name: ComponentNameEnum.OAUTH2_COMPLIANCE,

  components: {
    HComplianceCondition,
    HTable,
  },

  setup() {
    const { postExport } = useXlsx<OAuth2ComplianceEntity>();
    const { tableRows, totalPages, pagination, loading, conditions, findItems } = useTable<
      OAuth2ComplianceEntity,
      OAuth2ComplianceConditions
    >(api.oauth2Compliance(), ComponentNameEnum.OAUTH2_COMPLIANCE, false, {
      direction: 'DESC',
      properties: ['createTime'],
    });

    const selected = ref([]);
    const rowKey: OAuth2ComplianceProps = 'complianceId';

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
        name: 'mobile',
        field: 'mobile',
        align: 'center',
        label: '移动端？',
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

    const title: EntityTitle<OAuth2ComplianceEntity> = {
      createTime: '创建时间',
      updateTime: '更新时间',
      ranking: '排序值',
      complianceId: 'ID',
      principalName: '用户名',
      clientId: 'OAuth2 客户端ID',
      ip: 'IP地址',
      mobile: '是移动端 ?',
      osName: '操作系统',
      browserName: '浏览器',
      mobileBrowser: '是移动端浏览器 ?',
      engineName: '浏览器引擎',
      mobilePlatform: '是移动端平台 ?',
      iphoneOrIpod: 'Iphone Or Ipod ?',
      ipad: 'Ipad ?',
      ios: 'IOS 操作系统 ?',
      android: 'Android 操作系统?',
      operation: '执行操作',
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
