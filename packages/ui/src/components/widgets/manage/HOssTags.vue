<template>
  <div>
    <div class="q-gutter-xs">
      <q-chip
        v-for="(value, key) in tags"
        :key="key"
        removable
        @remove="onRemove(key)"
        color="primary"
        text-color="white">
        {{ key + ':' + value }}
      </q-chip>
    </div>

    <q-chip clickable outline color="primary" text-color="white" icon="mdi-plus" @click="open = true">添加标签</q-chip>
    <h-dialog v-model="open" v-model:loading="loading" title="添加标签" @save="onSave">
      <h-text-field
        v-model="tagKey"
        label="标签 Key"
        placeholder="请输入新建标签 Key"
        :rules="[(val: string) => !!val || '标签 Key 不能为空']"></h-text-field>
      <h-text-field
        v-model="tagValue"
        label="标签 Value"
        placeholder="请输入新建标签 Value"
        :rules="[(val: string) => !!val || '标签 Value 不能为空']"></h-text-field>
    </h-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';

import type { TagsDo } from '/@/lib/declarations';

export default defineComponent({
  name: 'HOssTags',

  props: {
    modelValue: { type: Object as PropType<TagsDo>, required: true, default: () => ({}) },
    bucketName: { type: String }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const tags = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const open = ref(false);
    const loading = ref(false);
    const tagKey = ref('');
    const tagValue = ref('');

    const onRemove = (key: string) => {};

    const onSave = () => {};

    return {
      tags,
      open,
      loading,
      tagKey,
      tagValue,
      onRemove,
      onSave
    };
  }
});
</script>
