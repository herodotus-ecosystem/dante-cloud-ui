<template>
  <q-card>
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
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HCompletedTaskTable from './HCompletedTaskTable.vue';
import HToDoTaskTable from './HToDoTaskTable.vue';

export default defineComponent({
  name: 'HWorkbenchWorkflow',

  components: {
    HCompletedTaskTable,
    HToDoTaskTable
  },

  setup(props) {
    const tab = ref('todo');

    return { tab };
  }
});
</script>
