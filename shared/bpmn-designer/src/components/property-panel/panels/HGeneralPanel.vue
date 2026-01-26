<template>
  <h-expansion-item icon="mdi-information-outline" label="常规信息" default-opened>
    <q-input v-model="elementName" dense outlined label="名称" @update:model-value="updateName" />
    <q-input
      v-model="elementId"
      dense
      outlined
      label="编号"
      @update:model-value="updateId"
      class="q-mt-md"
    />
    <template v-if="isProcessElement">
      <q-input
        v-model="versionTag"
        dense
        outlined
        label="版本"
        @update:model-value="updateVersionTag"
        class="q-mt-md"
      />
      <q-toggle
        v-model="isExecutable"
        dense
        outlined
        label="可执行文件"
        @update:model-value="updateIsExecutable"
        class="q-mt-md"
      />
    </template>
  </h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';

import { useDesignerStore } from '@/stores';
import { useGeneralProperties } from '@/hooks';
import { toast } from '@/lib/utils';
import { isEmpty } from 'lodash-es';

import { HExpansionItem } from '../../widgets';

export default defineComponent({
  name: 'HElementGeneral',

  components: {
    HExpansionItem,
  },

  setup() {
    const elementId = ref<string>('');
    const elementName = ref<string>('');
    const versionTag = ref<string>('');
    const isExecutable = ref<boolean>(true);

    const designer = useDesignerStore();

    const {
      isProcess,
      setIdValue,
      getNameValue,
      setNameValue,
      getIsExecutableValue,
      setIsExecutableValue,
      getVersionTagValue,
      setVersionTagValue,
      isIdValid,
      isVersionTagValid,
    } = useGeneralProperties();

    const isProcessElement = computed(() => {
      return !!isProcess(designer.activeElement);
    });

    const loading = () => {
      elementId.value = designer.activeElementId;

      elementName.value = getNameValue(designer.activeElement);
      if (isProcess(designer.activeElement)) {
        isExecutable.value = getIsExecutableValue(designer.activeElement);
        versionTag.value = getVersionTagValue(designer.activeElement);
      }
    };

    const updateName = (value: string | number | null) => {
      setNameValue(designer.activeElement, value as string);
    };

    const updateId = (value: string | number | null) => {
      const errorMsg = isIdValid(designer.activeElement, value as string);

      if (isEmpty(errorMsg)) {
        setIdValue(designer.activeElement, value as string);
      } else {
        toast.error(errorMsg);
      }
    };
    const updateVersionTag = (value: string | number | null) => {
      if (isVersionTagValid(value as string)) {
        setVersionTagValue(designer.activeElement, value as string);
      } else {
        toast.error('版本号必须符合语义化版本2.0.0 要点');
      }
    };

    const updateIsExecutable = (value: boolean) => {
      setIsExecutableValue(designer.activeElement, value);
    };

    watch(
      () => designer.activeElement.id,
      () => {
        loading();
      },
      { immediate: true, deep: true },
    );

    return {
      isProcessElement,
      elementId,
      elementName,
      versionTag,
      isExecutable,
      updateName,
      updateId,
      updateVersionTag,
      updateIsExecutable,
    };
  },
});
</script>
