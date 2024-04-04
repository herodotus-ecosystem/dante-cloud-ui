<template>
  <h-column lg="3" md="3" sm="12" xs="12" :color="color">
    <q-card>
      <q-card-section class="q-pa-sm">
        <q-item class="q-pb-none q-pt-xs">
          <q-item-section>
            <q-item-label class="text-h4" style="font-weight: 500; letter-spacing: 3px">{{ numeric }}</q-item-label>
            <q-item-label :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'">{{ description }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon :name="icon" :color="color" size="60px"></q-icon>
          </q-item-section>
        </q-item>
        <q-item class="q-py-xs" style="min-height: unset">
          <q-item-section>
            <div class="q-my-sm">
              <q-linear-progress stripe size="10px" :value="percent" :color="color" />
            </div>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </h-column>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HSummaryBox',

  props: {
    numeric: { type: [String, Number] },
    percent: { type: Number },
    description: { type: String },
    icon: { type: String },
    color: { type: String, default: '' }
  }
});
</script>
