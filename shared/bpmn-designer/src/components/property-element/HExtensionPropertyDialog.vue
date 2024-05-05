<template>
  <q-dialog v-model="isOpen" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 20vw">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">设置扩展属性</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="isOpen = false" />
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="property.name"
          ref="nameRef"
          outlined
          dense
          label="属性名称"
          :rules="[val => !!val || '属性名称不能为空']"
          placeholder="请输入属性名称"></q-input>
        <q-input
          v-model="property.value"
          ref="valueRef"
          outlined
          dense
          label="属性值"
          :rules="[val => !!val || '属性值不能为空']"
          placeholder="请输入属性值"></q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="取消" color="red" @click="isOpen = false" />
        <q-btn :disable="isDisabled" label="保存" color="primary" @click="onSave()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch } from 'vue';

import type { ExtensionProperty } from '/@/declarations';

export default defineComponent({
  name: 'HExtensionPropertyDialog',

  props: {
    modelValue: { type: Boolean, default: false }
  },

  emits: ['update:modelValue', 'update:open', 'save'],

  setup(props, { emit }) {
    const property = ref({}) as Ref<ExtensionProperty>;

    const isOpen = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    watch(isOpen, newValue => {
      if (newValue) {
        property.value = {} as ExtensionProperty;
      }
    });

    const isDisabled = computed(() => {
      if (property.value.name && property.value.value) {
        return false;
      } else {
        return true;
      }
    });

    const onSave = () => {
      emit('save', property.value);
    };

    return {
      isOpen,
      property,
      isDisabled,
      onSave
    };
  }
});
</script>
