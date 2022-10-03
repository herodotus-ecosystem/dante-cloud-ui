<template>
  <h-row justify="center" gutter="xs">
    <q-btn v-if="!hasConfig" round color="primary" icon="mdi-wechat" />
    <template v-else>
      <q-btn v-for="(value, key, index) in list" flat round :key="index" :href="value" target="_blank">
        <q-avatar size="30px">
          <img :src="getImage(key)" />
        </q-avatar>
      </q-btn>
    </template>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, onMounted } from 'vue';
import { useOpenApi } from '/@/apis';
import { getSocialLogo, lodash } from '/@/lib/utils';

export default defineComponent({
  name: 'HSocialSiginList',

  setup() {
    const openApi = useOpenApi();

    const list = ref({}) as Ref<Record<string, string>>;

    const init = () => {
      openApi.getSocialList().then(result => {
        list.value = result.data as Record<string, string>;
      });
    };

    const getImage = (source: string) => {
      const name = source.toLowerCase();
      return getSocialLogo(name);
    };

    const hasConfig = computed(() => {
      return !lodash.isEmpty(list.value);
    });

    onMounted(() => {
      init();
    });

    return {
      list,
      getImage,
      hasConfig
    };
  }
});
</script>
