import type { Entity } from '@/composables/declarations';

import { useBaseTableItem } from '@/composables/hooks';

export default function useBpmnTableItem<E extends Entity>() {
  const { editedItem, operation, overlay, title } = useBaseTableItem<E>();

  return {
    editedItem,
    operation,
    title,
    overlay,
  };
}
