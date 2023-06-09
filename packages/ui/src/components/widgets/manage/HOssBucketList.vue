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

import type { BucketResponse } from '/@/lib/declarations';

import { api, lodash } from '/@/lib/utils';

export default defineComponent({
  name: 'HOssBucketList',

  props: {
    modelValue: { type: String }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const bucketName = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });
    const items = ref<Array<BucketResponse>>([]);

    const initialize = () => {
      api
        .ossBucket()
        .list()
        .then(result => {
          const data = result.data as Array<BucketResponse>;
          initBucket();
          items.value = data;
        })
        .catch(() => {});
    };

    const initBucket = () => {
      if (!lodash.isEmpty(items.value)) {
        const firstItem: BucketResponse = items.value[0];
        bucketName.value = firstItem.name;
      }
    };

    onMounted(() => {
      initialize();
    });

    const onClick = (item: BucketResponse) => {
      bucketName.value = item.name;
    };

    return {
      items,
      onClick
    };
  }
});
</script>
