<template>
  <div class="q-gutter-y-md">
    <h-table :rows="[]">
      <template #top-left>
        <q-btn color="primary" label="发起任务（功能建设中...）" :disable="true" />
      </template>
    </h-table>
  </div>
</template>

<script setup lang="ts">
import { HTable } from '@/components';
const thisName = 'WorkflowProcessStart';
defineOptions({ name: thisName });
</script>
