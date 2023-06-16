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

  emits: ['fetch'],

  setup(props, { emit }) {
    const items = ref<Array<BucketDomain>>([]);

    const oss = useOssStore();

    const initialize = () => {
      api
        .ossBucket()
        .list()
        .then(result => {
          const data = result.data as Array<BucketDomain>;
          initBucket();
          items.value = data;
        })
        .catch(() => {});
    };

    const initBucket = () => {
      if (!lodash.isEmpty(items.value)) {
        const firstItem: BucketDomain = items.value[0];
        oss.bucketName = firstItem.name;
      }
    };

    const onClick = (item: BucketDomain) => {
      oss.bucketName = item.name;
      emit('fetch');
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
