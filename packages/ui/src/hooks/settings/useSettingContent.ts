import { ref, Ref } from 'vue';

import { useRoute } from 'vue-router';
import { useRouteStore } from '/@/stores';

export default function useSettingContent<T>() {
  const store = useRouteStore();
  const route = useRoute();

  const editedItem = ref({}) as Ref<T>;

  const parseParam = () => {
    const name = route.name as string;
    if (name) {
      const params = store.getRoutePushParam(name);
      if (params.item) {
        const item = JSON.parse(params.item as string);
        editedItem.value = item;
      }
    }
  };

  onMounted(() => {
    parseParam();
  });
}
