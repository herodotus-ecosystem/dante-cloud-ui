<template>
  <q-select
    ref="selectRef"
    v-model="selectedValue"
    :options="options"
    outlined
    clearable
    use-input
    use-chips
    emit-value
    bottom-slots
    input-debounce="300"
    transition-show="scale"
    transition-hide="scale"
    @filter="filter"
    v-bind="$attrs"
  >
    <template v-if="selectedValue" v-slot:prepend>
      <q-icon :name="selectedValue" color="primary" />
    </template>

    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="scope.opt" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">没有数据</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { QIcon, QItem, QItemLabel, QItemSection, QSelect } from 'quasar';

import { ref, onMounted } from 'vue';
import * as allIcons from '@mdi/js';
import { kebabCase } from 'lodash-es';

defineOptions({
  name: 'HIconSelect',
  components: { QSelect, QIcon, QItem, QItemSection, QItemLabel },
});

const selectedValue = defineModel<string>();

let icons: Array<string> = [];
const options = ref<Array<string>>(icons);

onMounted(() => {
  icons = Object.keys(allIcons).map((icon) => {
    return kebabCase(icon);
  });
});

const filter = (
  value: string,
  update: (callbackFn: () => void, after?: (ref: QSelect) => void) => void,
  abort: () => void,
) => {
  if (value.length < 3) {
    abort();
    return;
  }

  update(() => {
    const needle = value.toLowerCase();
    options.value = icons.filter((v) => v.toLowerCase().match(needle));
  });
};
</script>
