<template>
  <div>
    <q-list class="rounded-borders">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Brunch this weekend?</q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold">Janet</span>
            -- I'll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
          </q-item-label>
        </q-item-section>

        <q-item-section side top>1 min ago</q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Linear Project</q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold">John</span>
            -- Can we schedule a call for tomorrow?
          </q-item-label>
        </q-item-section>

        <q-item-section side top>1 min ago</q-item-section>
      </q-item>
      <q-separator />
    </q-list>
    <h-row justify="center" class="q-mt-md">
      <h-column :cols="4">
        <q-pagination v-model="pageNumber" max="5" direction-links flat color="grey" active-color="primary" />
      </h-column>
    </h-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HNotificationInformationList',

  setup(props) {
    const pageNumber = ref<number>(1);
    return {
      pageNumber
    };
  }
});
</script>
