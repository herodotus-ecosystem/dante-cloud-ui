import type { Domain } from '@herodotus-cloud/core';

import { useRoute } from 'vue-router';
import { OperationEnum } from '@herodotus-cloud/core';

import { useEditFinish, useRouterStore } from '@herodotus-cloud/framework-kernel';

export default function useBaseTableItem<I extends Domain>() {
  const { onFinish } = useEditFinish();

  const route = useRoute();

  const editedItem = ref({}) as Ref<I>;
  const operation = ref(OperationEnum.CREATE) as Ref<OperationEnum>;
  const additional = ref({}) as Ref<Record<string, unknown>>;
  const title = ref('');
  const overlay = ref(false);
  const store = useRouterStore();

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
        case OperationEnum.INFO:
          return '查看' + content;
        case OperationEnum.CREATE:
          return '新建' + content;
        default:
          return content;
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
