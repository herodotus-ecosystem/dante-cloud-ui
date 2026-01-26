import { computed } from 'vue';

import type { Entity, HttpResult } from '@/lib/declarations';

import { AbstractService, OperationEnum } from '@/lib/definitions';
import { toast } from '@herodotus-cloud/core';
import useBaseTableItem from './useBaseTableItem';

export default function useTableItem<E extends Entity>(AbstractService: AbstractService<E>) {
  const { editedItem, operation, overlay, title, additional, onFinish } = useBaseTableItem<E>();

  const isEdit = computed(() => {
    return operation.value === OperationEnum.EDIT;
  });

  const saveOrUpdate = () => {
    overlay.value = true;
    AbstractService.saveOrUpdate(editedItem.value)
      .then((response) => {
        const result = response as HttpResult<E>;
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
    AbstractService.assign(data)
      .then((response) => {
        const result = response as HttpResult<E>;
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
