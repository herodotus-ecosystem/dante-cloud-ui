import type { Ref } from 'vue';
import { ref, watch } from 'vue';

import type { Entity, Conditions, Tree } from '@/lib/declarations';
import { BaseService } from '@/lib/definitions';

export default function useTreeItems<T extends Entity, C extends Conditions>(
  baseService: BaseService<T>,
  immediate = true,
) {
  const treeItems = ref<Tree[]>([]) as Ref<Tree[]>;
  const loading = ref<boolean>(false);
  const conditions = ref({}) as Ref<C>;

  const fetchTree = (params: Conditions = {}) => {
    baseService.fetchTree(params).then((result) => {
      const data = result.data as Array<Tree>;
      if (data) {
        treeItems.value = data;
      } else {
        treeItems.value = [];
      }
    });
  };

  watch(
    () => conditions.value,
    (newValue) => {
      fetchTree(newValue);
    },
    {
      deep: true,
      immediate: immediate,
    },
  );

  return {
    loading,
    conditions,
    treeItems,
    fetchTree,
  };
}
