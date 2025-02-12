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
      <h-label :text="subtitle" size="subtitle-1" weight="bolder" align="left" class="q-mb-md"></h-label>
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
import type { PropType } from 'vue';
import { defineComponent, ref, computed } from 'vue';

import { ossApi, standardDeleteNotify } from '/@/lib/utils';

export default defineComponent({
  name: 'HOssTags',

  props: {
    modelValue: { type: Object as PropType<Record<string, string>>, required: true, default: () => ({}) },
    bucketName: { type: String, required: true },
    objectName: { type: String, default: '' }
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

    const subtitle = computed(() => {
      return props.objectName ? '对象：' + props.objectName : '存储桶：' + props.bucketName;
    });

    const addOrDeleteTags = (bucketName: string, objectName = '', tags: Record<string, string>, isAdd = true) => {
      if (!props.objectName) {
        ossApi
          .minioBucketTags()
          .set({ bucketName: bucketName, tags: tags })
          .then(() => {
            if (isAdd) {
              loading.value = false;
              open.value = false;
            }
            emit('tagChange');
          });
      } else {
        ossApi
          .minioObjectTags()
          .set({ bucketName: bucketName, objectName: objectName, tags: tags })
          .then(() => {
            if (isAdd) {
              loading.value = false;
              open.value = false;
            }
            emit('tagChange');
          });
      }
    };

    const clearTags = (bucketName: string, objectName = '', tags: Record<string, string>) => {
      if (!props.objectName) {
        ossApi
          .minioBucketTags()
          .delete({ bucketName: bucketName })
          .then(() => {
            emit('tagChange');
          });
      } else {
        ossApi
          .minioObjectTags()
          .delete({ bucketName: bucketName, objectName: objectName })
          .then(() => {
            emit('tagChange');
          });
      }
    };

    const onSave = () => {
      tags.value[tagKey.value] = tagValue.value;
      addOrDeleteTags(props.bucketName, props.objectName, tags.value);
    };

    const onRemove = (key: string) => {
      standardDeleteNotify(() => {
        if (Object.keys(tags.value).length === 1) {
          clearTags(props.bucketName, props.objectName, tags.value);
        } else {
          delete tags.value[key];
          addOrDeleteTags(props.bucketName, props.objectName, tags.value, false);
        }
      });
    };

    return {
      tags,
      open,
      loading,
      tagKey,
      tagValue,
      subtitle,
      onRemove,
      onSave
    };
  }
});
</script>
