<template>
  <q-select
    v-model="selectedValue"
    :options="options"
    dense
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
    v-bind="$attrs">
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">没有数据</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, Ref, watch } from 'vue';
import { QSelect } from 'quasar';

import type { FormSelectItem } from '/@/declarations';

import { useResourceStore } from '/@/stores';
import { lodash } from '/@/lib/utils';

export default defineComponent({
  name: 'HFormSelect',

  props: {
    modelValue: { type: String }
  },

  setup(props, { emit }) {
    const selectedValue = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const resource = useResourceStore();

    const options = ref([]) as Ref<Array<FormSelectItem>>;

    const fetchAllItems = async () => {
      const result = await resource.dynamicFormService.fetchAll();
      const data = result.data;
      if (!lodash.isEmpty(data)) {
        options.value = data.map(i => {
          return { label: i.name + '-' + i.activityName, value: i.id } as FormSelectItem;
        });
      }
    };

    onMounted(() => {
      fetchAllItems();
    });

    const filter = (
      value: string,
      update: (callbackFn: () => void, after?: (ref: QSelect) => void) => void,
      abort: () => void
    ) => {
      update(() => {
        const needle = value.toLowerCase();
        options.value = options.value.filter(v => v.label.match(needle));
      });
    };

    return {
      selectedValue,
      options,
      filter
    };
  }
});
</script>
