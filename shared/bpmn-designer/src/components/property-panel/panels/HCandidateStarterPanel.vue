<template>
  <h-expansion-item icon="mdi-account-reactivate-outline" label="候选启动">
    <h-candidate-group-text-field
      v-model="candidateStarterGroups"
      label="候选启动组"
      title="选择候选启动组"
      hint="可指定多个组以逗号分隔"
      @update:model-value="updateCandidateStarterGroups"></h-candidate-group-text-field>
    <h-candidate-user-text-field
      v-model="candidateStarterUsers"
      label="候选启动用户"
      title="选择候选启动用户"
      hint="可指定多个用户以逗号分隔"
      @update:model-value="updateCandidateStarterUsers"></h-candidate-user-text-field>
  </h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

import { useDesignerStore } from '/@/stores';
import { useCandidateStarterProperties } from '/@/hooks';

import { HExpansionItem } from '/@/components/widgets';
import { HCandidateUserTextField, HCandidateGroupTextField } from '/@/components/property-element';

export default defineComponent({
  name: 'HCandidateStarterPanel',

  components: {
    HCandidateGroupTextField,
    HCandidateUserTextField,
    HExpansionItem
  },

  setup() {
    const designer = useDesignerStore();

    const {
      getCandidateStarterGroupsValue,
      setCandidateStarterGroupsValue,
      getCandidateStarterUsersValue,
      setCandidateStarterUsersValue
    } = useCandidateStarterProperties();

    const candidateStarterUsers = ref<string>('');
    const candidateStarterGroups = ref<string>('');

    const updateCandidateStarterGroups = (value: string | number | null) => {
      setCandidateStarterGroupsValue(designer.activeElement, value as string);
    };

    const updateCandidateStarterUsers = (value: string | number | null) => {
      setCandidateStarterUsersValue(designer.activeElement, value as string);
    };

    const loading = () => {
      candidateStarterGroups.value = getCandidateStarterGroupsValue(designer.activeElement);
      candidateStarterUsers.value = getCandidateStarterUsersValue(designer.activeElement);
    };

    watch(
      () => designer.activeElement.id,
      () => {
        loading();
      },
      { immediate: true, deep: true }
    );

    return {
      candidateStarterGroups,
      candidateStarterUsers,
      updateCandidateStarterGroups,
      updateCandidateStarterUsers
    };
  }
});
</script>
