<template>
  <q-card>
    <q-card-section>
      <q-list bordered padding>
        <q-item-label header>存储桶列表</q-item-label>
        <q-item v-for="(item, index) in items" :key="index" clickable v-ripple @click="onClick(item)">
          <q-item-section avatar>
            <q-icon color="primary" name="mdi-bucket-outline" />
          </q-item-section>
          <q-item-section>{{ item.name }}</q-item-section>
          <q-item-section avatar>
            <q-icon color="grey" name="mdi-chevron-right" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import type { BucketDomain } from '/@/lib/declarations';

import { api, lodash } from '/@/lib/utils';
import { useOssStore } from '/@/stores';

export default defineComponent({
  name: 'HOssBucketList',

  props: {
    modelValue: { type: String, default: '', required: true },
    version: { type: Number, default: 0 }
  },

  emits: ['update:modelValue', 'update:version'],

  setup(props, { emit }) {
    const bucketName = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const key = computed({
      get: () => props.version,
      set: newValue => {
        emit('update:version', newValue);
      }
    });

    const items = ref<Array<BucketDomain>>([]);

    const selectItem = (name: string) => {
      bucketName.value = name;
      key.value = +new Date();
    };

    const initialize = () => {
      api
        .ossBucket()
        .list()
        .then(result => {
          const data = result.data as Array<BucketDomain>;
          items.value = data;
        });
    };

    const onClick = (item: BucketDomain) => {
      selectItem(item.name);
    };

    onMounted(() => {
      initialize();
    });

    return {
      items,
      onClick
    };
  }
});
</script>
