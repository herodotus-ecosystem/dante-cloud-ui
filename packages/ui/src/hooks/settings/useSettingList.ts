import { onMounted } from 'vue';

import { useRouter } from 'vue-router';
import { OperationEnum } from '/@/lib/enums';
import { useRouteStore } from '/@/stores';

export default function useSettingList<T>(name: string) {
  const store = useRouteStore();
  const router = useRouter();

  const toContent = (item: T) => {
    const routeName = name + 'Content';
    store.addRoutePushParam(routeName, { item: JSON.stringify(item), operation: OperationEnum.EDIT });
    router.push({ name: routeName });
  };

  onMounted(() => {});

  return {
    toContent
  };
}
