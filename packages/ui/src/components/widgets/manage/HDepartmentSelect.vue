<template>
  <q-select
    v-model="selectedValue"
    :options="departments"
    option-label="departmentName"
    option-value="departmentId"
    outlined
    use-chips
    clearable
    emit-value
    map-options
    transition-show="scale"
    transition-hide="scale"
    :bottom-slots="hasError"
    :error="hasError"
    :error-message="errorMessage"
    v-bind="$attrs"
  ></q-select>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, computed, watch, ref, onMounted } from 'vue';
import type { SysDepartmentEntity } from '@/lib/declarations';
import { api } from '@/lib/utils';

export default defineComponent({
  name: 'HOrganizationSelect',

  props: {
    modelValue: { type: [Number, String] },
    organizationId: { type: String, default: '' },
    errorMessage: { type: String },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const departments = ref([]) as Ref<Array<SysDepartmentEntity>>;

    const selectedValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const loadData = (organizationId: string) => {
      api
        .sysDepartment()
        .fetchAll({ organizationId })
        .then((result) => {
          const data = result.data as Array<SysDepartmentEntity>;
          departments.value = data;
        });
    };

    const hasError = computed(() => {
      return props.errorMessage ? true : false;
    });

    onMounted(() => {
      loadData(props.organizationId);
    });

    watch(
      () => props.organizationId,
      (newValue: string) => {
        loadData(newValue);
      },
      {
        immediate: true,
      },
    );

    return {
      departments,
      selectedValue,
      hasError,
    };
  },
});
</script>
