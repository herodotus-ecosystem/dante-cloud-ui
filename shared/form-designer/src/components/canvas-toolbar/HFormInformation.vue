<template>
  <q-list>
    <q-input v-model="id" dense outlined label="ID" />
    <q-input
      ref="nameRef"
      v-model="name"
      dense
      outlined
      label="表单名称"
      :rules="[(val) => !!val || '表单名称不能为空']"
    />
    <q-input
      ref="activityNameRef"
      v-model="activityName"
      dense
      outlined
      label="流程节点名称"
      :rules="[(val) => !!val || '流程节点不能为空']"
    />
  </q-list>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref } from 'vue';
import { QInput } from 'quasar';

import { useFormCanvasStore } from '@/stores';

export default defineComponent({
  name: 'HFormInformation',

  setup() {
    const store = useFormCanvasStore();
    const { id, name, activityName } = store;

    const nameRef = ref(null) as Ref<QInput | null>;
    const activityNameRef = ref(null) as Ref<QInput | null>;

    const validate = (): boolean => {
      const nameElement = nameRef.value as QInput;
      const activityNameElement = activityNameRef.value as QInput;

      nameElement.validate();
      activityNameElement.validate();

      return !nameElement.hasError && !activityNameElement.hasError;
    };

    return {
      id,
      name,
      activityName,
      nameRef,
      activityNameRef,
      validate,
    };
  },
});
</script>
