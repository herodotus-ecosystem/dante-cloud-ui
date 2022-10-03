import { ref, Ref, watch } from 'vue';

import type { Entity, Conditions, BaseTree, BaseService } from '/@/lib/declarations';

export default function useTreeItems<T extends Entity, C extends Conditions>(
  baseService: BaseService<T>,
  immediate = true
) {
  const treeItems = ref<BaseTree[]>([]) as Ref<BaseTree[]>;
  const loading = ref<boolean>(false);
  const conditions = ref({}) as Ref<C>;

  const fetchTree = (params: Conditions = {}) => {
    baseService.fetchTree(params).then(result => {
      const data = result.data as Array<BaseTree>;
      if (data) {
        treeItems.value = data;
      } else {
        treeItems.value = [];
      }
    });
  };

  watch(
    () => conditions.value,
    newValue => {
      fetchTree(newValue);
    },
    {
      deep: true,
      immediate: immediate
    }
  );

  return {
    loading,
    conditions,
    treeItems,
    fetchTree
  };
}
