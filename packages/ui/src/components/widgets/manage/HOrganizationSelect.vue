<template>
  <q-select
    v-model="selectedValue"
    :options="organizations"
    option-label="organizationName"
    option-value="organizationId"
    outlined
    use-chips
    clearable
    emit-value
    map-options
    transition-show="scale"
    transition-hide="scale"
    label="所属单位"
    placeholder="请选择所属单位"
    :bottom-slots="hasError"
    :error="hasError"
    :error-message="errorMessage"
    v-bind="$attrs"
  ></q-select>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, computed, watch, ref, onMounted } from 'vue';
import type { SysOrganizationEntity } from '@/lib/declarations';
import { api } from '@/lib/utils';

export default defineComponent({
  name: 'HOrganizationSelect',

  props: {
    modelValue: { type: [Number, String] },
    category: { type: [Number, String], default: '' },
    errorMessage: { type: String },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const organizations = ref([]) as Ref<Array<SysOrganizationEntity>>;

    const selectedValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const loadData = (category: number | string) => {
      api
        .sysOrganization()
        .fetchAll({ category: category })
        .then((result) => {
          const data = result.data as Array<SysOrganizationEntity>;
          organizations.value = data;
        });
    };

    const hasError = computed(() => {
      return props.errorMessage ? true : false;
    });

    onMounted(() => {
      loadData(props.category);
    });

    watch(
      () => props.category,
      (newValue) => {
        loadData(newValue);
      },
      {
        immediate: true,
      },
    );

    return {
      organizations,
      selectedValue,
      hasError,
    };
  },
});
</script>
