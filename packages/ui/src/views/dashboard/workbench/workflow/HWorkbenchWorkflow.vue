<template>
  <q-card>
    <q-card-section>
      <q-btn color="primary" label="新建流程" @click="isOpenDialog = true" />
    </q-card-section>

    <q-tabs v-model="tab" active-color="primary" align="left">
      <q-tab label="待办任务" name="todo"></q-tab>
      <q-tab label="已办任务" name="completed"></q-tab>
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="todo" class="q-pa-none">
        <h-to-do-task-table></h-to-do-task-table>
      </q-tab-panel>

      <q-tab-panel name="completed" class="q-pa-none">
        <h-completed-task-table></h-completed-task-table>
      </q-tab-panel>
    </q-tab-panels>
    <h-workflow-select-dialog v-model="isOpenDialog"></h-workflow-select-dialog>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import HCompletedTaskTable from './HCompletedTaskTable.vue';
import HToDoTaskTable from './HToDoTaskTable.vue';
import HWorkflowSelectDialog from './HWorkflowSelectDialog.vue';

export default defineComponent({
  name: 'HWorkbenchWorkflow',

  components: {
    HCompletedTaskTable,
    HToDoTaskTable,
    HWorkflowSelectDialog,
  },

  setup(props) {
    const tab = ref('todo');
    const isOpenDialog = ref<boolean>(false);

    return { tab, isOpenDialog };
  },
});
</script>
