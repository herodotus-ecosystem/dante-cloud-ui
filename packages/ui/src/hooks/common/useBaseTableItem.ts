import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import type { Entity } from '@/lib/declarations';

import { OperationEnum } from '@/lib/enums';
import { useRouteStore } from '@/stores';

import useEditFinish from './useEditFinish';

export default function useBaseTableItem<E extends Entity>() {
  const { onFinish } = useEditFinish();

  const route = useRoute();

  const editedItem = ref({}) as Ref<E>;
  const operation = ref(OperationEnum.CREATE) as Ref<OperationEnum>;
  const additional = ref({}) as Ref<Record<string, unknown>>;
  const title = ref('');
  const overlay = ref(false);
  const store = useRouteStore();

  onMounted(() => {
    parseParam();
  });

  const generateTitle = (content: string, operation: OperationEnum) => {
    if (operation) {
      switch (operation) {
        case OperationEnum.AUTHORIZE:
          return '配置' + content;
        case OperationEnum.EDIT:
          return '编辑' + content;
        default:
          return '新建' + content;
      }
    } else {
      return content;
    }
  };

  const parseParam = () => {
    const name = route.name as string;
    if (name) {
      const params = store.getRoutePushParam(name);
      if (params) {
        if (params.item) {
          const item = JSON.parse(params.item as string);
          editedItem.value = item;
        }
        if (params.operation) {
          operation.value = params.operation as OperationEnum;
          title.value = generateTitle(route.meta.title as string, operation.value);
        }

        if (params.additional) {
          additional.value = JSON.parse(params.additional as string);
        }
      }
    }
  };

  return {
    editedItem,
    operation,
    additional,
    title,
    overlay,
    onFinish,
  };
}
