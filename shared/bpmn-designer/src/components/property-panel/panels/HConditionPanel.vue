<template>
  <h-expansion-item icon="mdi-call-split" label="条件">
    <h-select v-model="conditionType" dense :options="conditionOptions" label="类型" hide-hint></h-select>
    <template v-if="isScript">
      <h-text-field v-model="format" dense label="格式" @update:model-value="updateFormat" />
      <h-select v-model="scriptType" dense :options="scriptOptions" label="脚本类型" hide-hint></h-select>
      <h-text-field
        v-if="isExternalResource"
        v-model="resource"
        dense
        label="资源"
        @update:model-value="updateResource" />
      <h-text-field
        v-else
        v-model="script"
        dense
        outlined
        type="textarea"
        label="脚本"
        @update:model-value="updateScript" />
    </template>

    <h-text-field
      v-if="isExpression"
      v-model="conditionExpression"
      dense
      label="条件表达式"
      @update:model-value="updateConditionExpression" />
  </h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue';

import { useDesignerStore } from '/@/stores';
import { useConditionProperties } from '/@/hooks';

import { HExpansionItem } from '/@/components/widgets';
import { HTextField, HSelect } from '/@/components/base';

export default defineComponent({
  name: 'HConditionPanel',

  components: {
    HExpansionItem,
    HTextField,
    HSelect
  },

  setup() {
    const designer = useDesignerStore();

    const conditionExpression = ref<string>('');
    const format = ref<string>('');
    const resource = ref<string>('');
    const script = ref<string>('');

    const {
      getConditionExpressionValue,
      setConditionExpressionValue,
      getFormatValue,
      setFormatValue,
      getResourceValue,
      setResourceValue,
      getScriptValue,
      setScriptValue,
      resetConditionExpression
    } = useConditionProperties();

    const conditionType = ref<string>('NONE');
    const conditionOptions = ref([
      { text: '无', value: 'NONE' },
      { text: '脚本', value: 'SCRIPT' },
      { text: '表达式', value: 'EXPRESSION' }
    ]);
    const scriptType = ref<string>('INLINE_SCRIPT');
    const scriptOptions = ref([
      { text: '外部资源', value: 'EXTERNAL_RESOURCE' },
      { text: '内联脚本', value: 'INLINE_SCRIPT' }
    ]);

    const isScript = computed(() => {
      return conditionType.value === 'SCRIPT';
    });

    const isExpression = computed(() => {
      return conditionType.value === 'EXPRESSION';
    });

    const isExternalResource = computed(() => {
      return scriptType.value === 'EXTERNAL_RESOURCE';
    });

    const updateConditionExpression = (value: string) => {
      setConditionExpressionValue(designer.activeElement, value);
    };

    const updateFormat = (value: string) => {
      setFormatValue(designer.activeElement, value);
    };

    const updateResource = (value: string) => {
      setResourceValue(designer.activeElement, value);
    };

    const updateScript = (value: string) => {
      setScriptValue(designer.activeElement, value);
    };

    const initSelectValue = () => {
      if (conditionExpression.value) {
        conditionType.value = 'EXPRESSION';
      } else {
        if (resource.value) {
          conditionType.value = 'SCRIPT';
          scriptType.value = 'EXTERNAL_RESOURCE';
        }

        if (script.value) {
          conditionType.value = 'SCRIPT';
          scriptType.value = 'INLINE_SCRIPT';
        }
      }
    };

    const loading = () => {
      conditionExpression.value = getConditionExpressionValue(designer.activeElement);
      format.value = getFormatValue(designer.activeElement);
      resource.value = getResourceValue(designer.activeElement);
      script.value = getScriptValue(designer.activeElement);
      initSelectValue();
    };

    watch(
      () => designer.activeElement.id,
      () => {
        loading();
      },
      { immediate: true, deep: true }
    );

    watch(
      () => conditionType.value,
      () => {
        resetConditionExpression(designer.activeElement);
        loading();
      }
    );

    watch(
      () => scriptType.value,
      () => {
        resetConditionExpression(designer.activeElement);
        if (format.value) {
          updateFormat(format.value);
        }
        loading();
      }
    );

    return {
      conditionExpression,
      format,
      resource,
      script,
      conditionType,
      conditionOptions,
      scriptType,
      scriptOptions,
      isScript,
      isExpression,
      isExternalResource,
      updateConditionExpression,
      updateFormat,
      updateResource,
      updateScript
    };
  }
});
</script>
