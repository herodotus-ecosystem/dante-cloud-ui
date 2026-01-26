import type { Domain, Conditions, Tree } from '@herodotus-cloud/core';
import { AbstractService } from '@herodotus-cloud/core';

export default function useTreeItems<C extends Conditions, I extends Domain>(
  service: AbstractService<I>,
  immediate = true,
) {
  const treeItems = ref<Tree[]>([]) as Ref<Tree[]>;
  const loading = ref<boolean>(false);
  const conditions = ref({}) as Ref<C>;

  const fetchTree = (params: Conditions = {}) => {
    service.fetchTree(params).then((result) => {
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
