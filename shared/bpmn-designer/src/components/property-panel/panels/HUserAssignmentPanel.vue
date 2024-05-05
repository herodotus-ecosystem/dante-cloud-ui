<template>
  <h-expansion-item icon="mdi-account-supervisor" label="用户分配">
    <h-candidate-user-text-field
      v-model="assignee"
      selection="single"
      label="代理人"
      title="选择代理人"
      @update:model-value="updateAssignee"></h-candidate-user-text-field>
    <h-candidate-group-text-field
      v-model="candidateGroups"
      label="候选组"
      title="选择候选组"
      @update:model-value="updateCandidateGroups"></h-candidate-group-text-field>
    <h-candidate-user-text-field
      v-model="candidateUsers"
      label="候选用户"
      title="选择候选用户"
      @update:model-value="updateCandidateUsers"></h-candidate-user-text-field>
    <h-text-field
      v-model="dueDate"
      dense
      label="到期时间"
      hint="表达式(eg.'${someDate}')或时间(eg.2015-06-26T09:00:30)"
      @update:model-value="updateDueDate" />
    <h-text-field
      v-model="followUpDate"
      dense
      label="后续时间"
      hint="表达式(eg.'${someDate}')或时间(eg.2015-06-26T09:00:30)"
      @update:model-value="updateFollowUpDate" />
    <h-text-field v-model="priority" dense label="优先级" @update:model-value="updatePriority" />
  </h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

import { useUserAssignmentProperties } from '/@/hooks';
import { useDesignerStore } from '/@/stores';

import { HExpansionItem } from '/@/components/widgets';
import { HTextField } from '/@/components/base';
import { HCandidateUserTextField, HCandidateGroupTextField } from '/@/components/property-element';

export default defineComponent({
  name: 'HUserAssignmentPanel',

  components: {
    HCandidateGroupTextField,
    HCandidateUserTextField,
    HExpansionItem,
    HTextField
  },

  setup() {
    const designer = useDesignerStore();

    const {
      getAssigneeValue,
      setAssigneeValue,
      getCandidateGroupsValue,
      setCandidateGroupsValue,
      getCandidateUsersValue,
      setCandidateUsersValue,
      getDueDateValue,
      setDueDateValue,
      getFollowUpDateValue,
      setFollowUpDateValue,
      getPriorityValue,
      setPriorityValue
    } = useUserAssignmentProperties();

    const assignee = ref<string>('');
    const candidateUsers = ref<string>('');
    const candidateGroups = ref<string>('');
    const dueDate = ref<string>('');
    const followUpDate = ref<string>('');
    const priority = ref<string>();

    const updateAssignee = (value: string | number | null) => {
      setAssigneeValue(designer.activeElement, value as string);
    };

    const updateCandidateGroups = (value: string | number | null) => {
      setCandidateGroupsValue(designer.activeElement, value as string);
    };

    const updateCandidateUsers = (value: string | number | null) => {
      setCandidateUsersValue(designer.activeElement, value as string);
    };

    const updateDueDate = (value: string | number | null) => {
      setDueDateValue(designer.activeElement, value as string);
    };

    const updateFollowUpDate = (value: string | number | null) => {
      setFollowUpDateValue(designer.activeElement, value as string);
    };

    const updatePriority = (value: string | number | null) => {
      setPriorityValue(designer.activeElement, value as string);
    };

    const loading = () => {
      assignee.value = getAssigneeValue(designer.activeElement);
      candidateGroups.value = getCandidateGroupsValue(designer.activeElement);
      candidateUsers.value = getCandidateUsersValue(designer.activeElement);
      dueDate.value = getDueDateValue(designer.activeElement);
      followUpDate.value = getFollowUpDateValue(designer.activeElement);
      priority.value = getPriorityValue(designer.activeElement);
    };

    watch(
      () => designer.activeElement.id,
      () => {
        loading();
      },
      { immediate: true }
    );

    return {
      assignee,
      candidateUsers,
      candidateGroups,
      dueDate,
      followUpDate,
      priority,
      updateAssignee,
      updateCandidateGroups,
      updateCandidateUsers,
      updateDueDate,
      updateFollowUpDate,
      updatePriority
    };
  }
});
</script>
