<template>
  <h-dialog v-model="isOpenDialog" title="设置保留配置">
    <h-label text="保留模式:" size="subtitle-1" weight="bolder" align="left"></h-label>
    <q-option-group
      v-model="retention.mode"
      :options="retentionModeOptions"
      color="primary"
      inline
      class="q-mb-md"
    />
    <h-label text="保留单位:" size="subtitle-1" weight="bolder" align="left"></h-label>
    <q-option-group
      v-model="retention.unit"
      :options="retentionUnitOptions"
      color="primary"
      inline
      class="q-mb-md"
    />
    <h-text-field
      v-model.number="retention.validity"
      label="保留有效期"
      placeholder="请输入保留有效期"
      type="number"
    />
  </h-dialog>
</template>

<script lang="ts">
import type { Ref, PropType } from 'vue';
import { defineComponent, ref, computed } from 'vue';

import type { ObjectLockConfigurationDomain, QBaseDataItem } from '/@/lib/declarations';

import { useConstantsStore } from '/@/stores';
import { lodash } from '/@/lib/utils';

export default defineComponent({
  name: 'HOssBucketRetention',

  props: {
    modelValue: { type: Object as PropType<ObjectLockConfigurationDomain>, default: () => ({}) },
    open: { type: Boolean, default: false },
    bucketName: { type: String, required: true },
    objectName: { type: String, default: '' },
  },

  emits: ['update:modelValue', 'update:open'],

  setup(props, { emit }) {
    const retention = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const isOpenDialog = computed({
      get: () => props.open,
      set: (newValue) => {
        emit('update:open', newValue);
      },
    });

    const constants = useConstantsStore();

    const retentionModeOptions = ref([]) as Ref<Array<QBaseDataItem<number>>>;
    const retentionUnitOptions = ref([]) as Ref<Array<QBaseDataItem<number>>>;

    const initRetentionModeOptions = () => {
      const retentionModes = constants.getDictionary('retentionMode');
      if (!lodash.isEmpty(retentionModes)) {
        retentionModes.map((item) => {
          retentionModeOptions.value.push({ label: item.text, value: item.value });
        });
      }
    };
    const initRetentionUnitOptions = () => {
      const retentionUnits = constants.getDictionary('retentionUnit');
      if (!lodash.isEmpty(retentionUnits)) {
        retentionUnits.map((item) => {
          retentionUnitOptions.value.push({ label: item.text, value: item.value });
        });
      }
    };

    onMounted(() => {
      initRetentionModeOptions();
      initRetentionUnitOptions();
    });

    return {
      isOpenDialog,
      retention,
      retentionModeOptions,
      retentionUnitOptions,
    };
  },
});
</script>
