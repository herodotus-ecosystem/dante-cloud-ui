<template>
  <h-detail-container :title="title" :overlay="overlay">
    <h-container :offset="4">
      <h-form-skeleton v-if="!obtainedElements" :number="5"></h-form-skeleton>
      <h-renderer-form v-else v-model="editedItem.state" :elements="elements"></h-renderer-form>
      <q-card>
        <q-card-section>
          <div class="text-h6">审批意见：</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-option-group
            v-if="hasCondition"
            v-model="approved"
            :options="conditionOptions"
            color="primary"
            inline
          />
          <q-input v-model="comments" outlined type="textarea" />
        </q-card-section>
      </q-card>

      <div class="q-mt-md">
        <q-btn color="red" @click="onCancel">取消</q-btn>
        <q-btn color="primary" class="q-ml-sm" @click="onSave">保存</q-btn>
        <slot name="button"></slot>
      </div>
    </h-container>
  </h-detail-container>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref, onMounted } from 'vue';

import type { Sheet, ProcessCommentsEntity, Variables } from '@/composables/declarations';

import { useBpmnProcess } from '@/composables/bpmn';
import { HDetailContainer, HFormSkeleton } from '@/components';
import { CONSTANTS, API } from '@/configurations';
import { useAuthenticationStore } from '@herodotus-cloud/framework-kernel';
import { toast } from '@herodotus-cloud/core';
import { isEmpty } from 'lodash-es';

export default defineComponent({
  name: CONSTANTS.ComponentName.WORKFLOW_PROCESS_APPROVE,

  components: {
    HDetailContainer,
    HFormSkeleton,
  },

  setup() {
    const {
      editedItem,
      title,
      overlay,
      skeleton,
      elements,
      formModeler,
      hasCondition,
      conditionOptions,
      obtainedElements,
      condition,
      onFinish,
      fetchTaskForm,
      startWorkflowProcess,
    } = useBpmnProcess();

    const approved = ref<boolean>(true);

    const sheet = ref({}) as Ref<Sheet>;
    const comments = ref('');

    const auth = useAuthenticationStore();

    const onSave = () => {
      API.form
        .processComments()
        .saveOrUpdate({
          username: auth.employeeId,
          userId: auth.employeeId,
          processInstanceId: editedItem.value.processDefinitionId as string,
          taskId: editedItem.value.taskId as string,
          activityId: editedItem.value.activityId,
          activityName: editedItem.value.activityName,
          message: '',
          fullMessage: comments.value,
          tenantId: editedItem.value.tenantId,
        })
        .then((result) => {
          const comment = result.data as ProcessCommentsEntity;
          if (!isEmpty(comment)) {
            editedItem.value.comments.push(comment);
            API.form
              .processSpecifics()
              .saveOrUpdate(editedItem.value)
              .then((response) => {
                const specifics = response.data;

                const name = condition.value.variable;
                const variables = {} as Variables;
                variables[name] = { value: approved.value };
                API.bpmn
                  .task()
                  .complete(specifics.taskId as string, {
                    variables: variables,
                    withVariablesInReturn: false,
                  })
                  .then(() => {
                    onFinish();
                    toast.success('保存成功！');
                  });
              });
          }
        })
        .catch(() => {
          toast.error('保存失败！');
        });
    };

    const onCancel = () => {
      onFinish;
    };

    onMounted(() => {
      fetchTaskForm(editedItem.value.taskId as string);
    });

    return {
      title,
      overlay,
      skeleton,
      editedItem,
      formModeler,
      elements,
      approved,
      sheet,
      hasCondition,
      conditionOptions,
      obtainedElements,
      comments,
      onSave,
      onCancel,
    };
  },
});
</script>
