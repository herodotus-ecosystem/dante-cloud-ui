import { ref } from 'vue';

import { useRoute } from 'vue-router';
import { useRouteStore } from '/@/stores';

export default function useSettingContent() {
  const store = useRouteStore();
  const route = useRoute();

  const itemId = ref<string>('');

  const parseParam = () => {
    const name = route.name as string;
    if (name) {
      const params = store.getRoutePushParam(name);
      if (params.item) {
        const item = JSON.parse(params.item as string);
        itemId.value = item;
      }
    }
  };

  onMounted(() => {
    parseParam();
  });
}
