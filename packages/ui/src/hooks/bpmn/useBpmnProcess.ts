import { ref, Ref, computed } from 'vue';

import type {
  Sheet,
  FormKeyEntity,
  ProcessSpecificsEntity,
  FormModeler,
  Element,
  ConditionVariable,
  ExtendedTask
} from '/@/lib/declarations';

import { useBaseTableItem, useEditFinish } from '../common';

import { bpmnApi, formApi, toast, lodash } from '/@/lib/utils';
import { useAuthenticationStore } from '/@/stores';

export default function useBpmnProcess() {
  const { editedItem, title, overlay } = useBaseTableItem<ProcessSpecificsEntity>();
  const { onFinish } = useEditFinish();
  const auth = useAuthenticationStore();

  const formModeler = ref({}) as Ref<FormModeler>;
  const sheet = ref({}) as Ref<Sheet>;
  const elements = ref([]) as Ref<Array<Element>>;
  const condition = ref({}) as Ref<ConditionVariable>;
  const skeleton = ref<boolean>(false);

  const obtainedElements = computed(() => {
    return !lodash.isEmpty(elements.value);
  });

  const hasCondition = computed(() => {
    return !lodash.isEmpty(condition.value);
  });

  const conditionOptions = computed(() => {
    return !lodash.isEmpty(condition.value) && !lodash.isEmpty(condition.value.options) ? condition.value.options : [];
  });

  const fetchFormModeler = async (id: string) => {
    const result = await formApi.dynamicForm().fetchById(id);
    formModeler.value = result.data.modeler;
    if (!lodash.isEmpty(formModeler.value)) {
      sheet.value = formModeler.value.sheet;
      elements.value = formModeler.value.elements;
      if (!lodash.isEmpty(sheet.value)) {
        condition.value = sheet.value.condition as ConditionVariable;
      }
    }
  };

  const fetchStartForm = async (key: string, tenantId = '') => {
    skeleton.value = true;
    const result = await bpmnApi.processDefinition().getStartFormKey({ key: key, tenantId: tenantId });
    const data = result as FormKeyEntity;
    if (data.key) {
      await fetchFormModeler(data.key);
    }
    skeleton.value = false;
  };

  const fetchTaskForm = async (taskId: string) => {
    const result = await bpmnApi.task().getFormKey(taskId);
    const data = result as FormKeyEntity;
    if (data.key) {
      await fetchFormModeler(data.key);
    }
  };

  const createProcessSpecifics = async (processDefinitionKey: string, tenantId = '') => {
    const result = await formApi.processSpecifics().saveOrUpdate({
      id: '',
      state: {},
      comments: [],
      processDefinitionKey: processDefinitionKey,
      tenantId: tenantId,
      created: true
    });
    editedItem.value = result.data as ProcessSpecificsEntity;
  };

  const fetchProcessSpecifics = async (extendedTask: ExtendedTask) => {
    const result = await formApi.processSpecifics().fetchById(extendedTask.businessKey);
    editedItem.value = result.data as ProcessSpecificsEntity;
    editedItem.value.taskId = extendedTask.taskId;
    editedItem.value.activityId = extendedTask.activityId;
    editedItem.value.activityName = extendedTask.activityName;
  };

  const complete = () => {

  }

  const startWorkflowProcess = (entity: ProcessSpecificsEntity) => {
    entity.created = false;
    formApi
      .processSpecifics()
      .saveOrUpdate(entity)
      .then(response => {
        const data = response.data as ProcessSpecificsEntity;
        bpmnApi
          .processDefinition()
          .start(
            { key: data.processDefinitionKey },
            { variables: { currentUserId: { type: 'String', value: auth.employeeId } }, businessKey: data.id as string }
          )
          .then(() => {
            overlay.value = false;
            onFinish();
            toast.success('保存成功！');
          });
      })
      .catch(() => {
        overlay.value = false;
        onFinish();
        toast.error('保存失败');
      });
  };

  const deleteProcessSpecifics = (id: string) => {
    formApi
      .processSpecifics()
      .delete(id)
      .then(() => {
        overlay.value = false;
        onFinish();
      })
      .catch(() => {
        overlay.value = false;
        onFinish();
      });
  };

  return {
    editedItem,
    skeleton,
    formModeler,
    title,
    overlay,
    elements,
    obtainedElements,
    hasCondition,
    conditionOptions,
    condition,
    onFinish,
    fetchStartForm,
    fetchTaskForm,
    createProcessSpecifics,
    fetchProcessSpecifics,
    startWorkflowProcess,
    deleteProcessSpecifics
  };
}
