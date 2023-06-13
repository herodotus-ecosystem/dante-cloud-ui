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

import type { SweetAlertResult } from '/@/lib/declarations';

import { api, Swal } from '/@/lib/utils';

export default defineComponent({
  name: 'HOssTags',

  props: {
    modelValue: { type: Object as PropType<Record<string, string>>, required: true, default: () => ({}) },
    bucketName: { type: String, required: true }
  },

  emits: ['update:modelValue', 'tagChange'],

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

    const removeTags = (key: string) => {
      if (Object.keys(tags.value).length === 1) {
        api
          .ossBucketTags()
          .delete({ bucketName: props.bucketName })
          .then(response => {
            emit('tagChange');
          });
      } else {
        delete tags.value[key];
        api
          .ossBucketTags()
          .set({ bucketName: props.bucketName, tags: tags.value })
          .then(response => {
            emit('tagChange');
          });
      }
    };

    const onRemove = (key: string) => {
      Swal.fire({
        title: '确定删除?',
        text: '您将无法恢复此操作！',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '是的, 删除!',
        cancelButtonText: '取消'
      }).then((confirm: SweetAlertResult) => {
        if (confirm.value) {
          removeTags(key);
        }
      });
    };

    const onSave = () => {
      tags.value[tagKey.value] = tagValue.value;
      api
        .ossBucketTags()
        .set({ bucketName: props.bucketName, tags: tags.value })
        .then(response => {
          loading.value = false;
          open.value = false;
          emit('tagChange');
        });
    };

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
