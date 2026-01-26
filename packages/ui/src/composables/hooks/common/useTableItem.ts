import type { Domain, HttpResult, AbstractService } from '@herodotus-cloud/core';

import { OperationEnum } from '@herodotus-cloud/core';
import { toast } from '@herodotus-cloud/core';
import useBaseTableItem from './useBaseTableItem';

export default function useTableItem<I extends Domain, O extends Domain = I>(
  service: AbstractService<I, O>,
) {
  const { editedItem, operation, overlay, title, additional, onFinish } = useBaseTableItem<I>();

  const isEdit = computed(() => {
    return operation.value === OperationEnum.EDIT;
  });

  const saveOrUpdate = () => {
    overlay.value = true;
    service
      .saveOrUpdate(editedItem.value)
      .then((response) => {
        const result = response as HttpResult<O>;
        overlay.value = false;
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success('保存成功');
        }
        onFinish();
      })
      .catch(() => {
        overlay.value = false;
        toast.error('保存失败');
        onFinish();
      });
  };

  const assign = (data: any) => {
    overlay.value = true;
    service
      .assign(data)
      .then((response) => {
        const result = response as HttpResult<O>;
        overlay.value = false;
        onFinish();
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success('保存成功');
        }
      })
      .catch(() => {
        overlay.value = false;
        onFinish();
        toast.error('保存失败');
      });
  };

  return {
    editedItem,
    operation,
    title,
    overlay,
    additional,
    saveOrUpdate,
    assign,
    isEdit,
  };
}
