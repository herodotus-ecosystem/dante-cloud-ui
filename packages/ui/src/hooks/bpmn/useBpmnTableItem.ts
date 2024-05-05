import type { Entity } from '/@/lib/declarations';

import { useBaseTableItem } from '../common';

export default function useBpmnTableItem<E extends Entity>() {
  const { editedItem, operation, overlay, title } = useBaseTableItem<E>();

  return {
    editedItem,
    operation,
    title,
    overlay
  };
}
