<template>
  <h-expansion-item icon="mdi-clipboard-text" label="表单">
    <h-select v-model="formsType" dense :options="formsOptions" label="类型" hide-hint></h-select>
    <template v-if="isCamundaForms">
      <h-text-field v-model="formRef" dense label="表单引用" @update:model-value="updateFormRef" />
      <h-select
        v-model="bindingType"
        dense
        :options="bindingOptions"
        label="绑定"
        hide-hint
      ></h-select>
      <h-text-field
        v-if="isFormRefVersion"
        v-model="formRefVersion"
        dense
        label="版本"
        @update:model-value="updateVersion"
      />
    </template>
    <h-form-select
      v-if="isEmbeddedOrExternalTaskForms"
      v-model="formKey"
      dense
      label="Form Key"
      @update:model-value="updateFormKey"
    />
  </h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue';

import { useDesignerStore } from '@/stores';
import { useFormsProperties } from '@/hooks';
import { FormTypeEnum, BindingTypeEnum } from '@/enums';

import { HExpansionItem } from '@/components/widgets';
import { HTextField, HSelect } from '@/components/base';
import { HFormSelect } from '@/components/property-element';

export default defineComponent({
  name: 'HFormPanel',

  components: {
    HExpansionItem,
    HSelect,
    HTextField,
    HFormSelect,
  },

  setup() {
    const designer = useDesignerStore();

    const {
      getFormKeyValue,
      setFormKeyValue,
      getFormRefValue,
      setFormRefValue,
      getFormRefVersionValue,
      setFormRefVersionValue,
      getFormRefBindingValue,
      setFormRefBindingValue,
      setGeneratedTaskFormsValues,
      resetGeneratedTaskFormsValues,
      hasExtensionElements,
      resetProperties,
    } = useFormsProperties();

    const formKey = ref<string>('');
    const formRef = ref<string>('');
    const formRefVersion = ref<string>('');
    const formRefBinding = ref<string>('');

    const formsType = ref<string>(FormTypeEnum.NONE);
    const formsOptions = ref([
      { text: '无', value: FormTypeEnum.NONE },
      { text: 'Camunda 表单', value: FormTypeEnum.CAMUNDA_FORMS },
      { text: '嵌入或外部任务表单', value: FormTypeEnum.EMBEDDED_OR_EXTERNAL_TASK_FORMS },
      { text: '生成的任务表单', value: FormTypeEnum.GENERATED_TASK_FORMS },
    ]);
    const bindingType = ref<string>(BindingTypeEnum.LATEST);
    const bindingOptions = ref([
      { text: '部署', value: BindingTypeEnum.DEVELOPMENT },
      { text: '最新', value: BindingTypeEnum.LATEST },
      { text: '版本', value: BindingTypeEnum.VERSION },
    ]);

    const isCamundaForms = computed(() => {
      return formsType.value === FormTypeEnum.CAMUNDA_FORMS;
    });

    const isEmbeddedOrExternalTaskForms = computed(() => {
      return formsType.value === FormTypeEnum.EMBEDDED_OR_EXTERNAL_TASK_FORMS;
    });

    const isFormRefVersion = computed(() => {
      return bindingType.value === BindingTypeEnum.VERSION;
    });

    const updateFormKey = (value: string) => {
      setFormKeyValue(designer.activeElement, value);
    };

    const updateFormRef = (value: string) => {
      setFormRefValue(designer.activeElement, value);
    };

    const updateVersion = (value: string) => {
      setFormRefVersionValue(designer.activeElement, value);
    };

    const initSelectValue = () => {
      if (hasExtensionElements(designer.activeElement)) {
        formsType.value = FormTypeEnum.GENERATED_TASK_FORMS;
      } else {
        if (formKey.value) {
          formsType.value = FormTypeEnum.EMBEDDED_OR_EXTERNAL_TASK_FORMS;
        }

        if (formRef.value || formRefVersion.value || formRefBinding.value) {
          formsType.value = FormTypeEnum.CAMUNDA_FORMS;
          if (formRefVersion.value) {
            bindingType.value = BindingTypeEnum.VERSION;
          }
          if (formRefBinding.value) {
            bindingType.value = formRefBinding.value;
          }
        }
      }
    };

    const loading = () => {
      formKey.value = getFormKeyValue(designer.activeElement);
      formRef.value = getFormRefValue(designer.activeElement);
      formRefVersion.value = getFormRefVersionValue(designer.activeElement);
      formRefBinding.value = getFormRefBindingValue(designer.activeElement);
    };

    const changeFormType = (type: string) => {
      switch (type) {
        case FormTypeEnum.GENERATED_TASK_FORMS:
          setGeneratedTaskFormsValues(designer.activeElement);
          break;
        case FormTypeEnum.CAMUNDA_FORMS:
          setFormRefValue(designer.activeElement, '');
          resetGeneratedTaskFormsValues(designer.activeElement);
          break;
        case FormTypeEnum.EMBEDDED_OR_EXTERNAL_TASK_FORMS:
          setFormKeyValue(designer.activeElement, '');
          resetGeneratedTaskFormsValues(designer.activeElement);
          break;
        default:
          resetGeneratedTaskFormsValues(designer.activeElement);
          break;
      }
    };

    watch(
      () => designer.activeElement.id,
      () => {
        loading();
        initSelectValue();
      },
      { immediate: true, deep: true },
    );

    watch(
      () => bindingType.value,
      (newValue) => {
        setFormRefBindingValue(designer.activeElement, newValue);
      },
    );

    watch(
      () => formsType.value,
      (newValue) => {
        changeFormType(newValue);
        resetProperties(designer.activeElement);
      },
    );

    return {
      formsType,
      formsOptions,
      bindingType,
      bindingOptions,
      formKey,
      formRef,
      formRefVersion,
      isCamundaForms,
      isEmbeddedOrExternalTaskForms,
      isFormRefVersion,
      updateFormKey,
      updateFormRef,
      updateVersion,
    };
  },
});
</script>
