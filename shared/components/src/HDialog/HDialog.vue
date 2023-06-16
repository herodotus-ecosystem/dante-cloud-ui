<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card class="q-py-none" :style="`min-width: ${height}`">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ title }}</div>

        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <slot></slot>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn label="取消" color="red" v-close-popup />
        <q-btn v-if="!hideSave" label="确认" color="primary" @click="onSave()" />
      </q-card-actions>

      <q-inner-loading :showing="showLoading">
        <q-spinner-dots :size="spinnerSize" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { ClosePopup } from 'quasar';

export default defineComponent({
  name: 'HDialog',

  directives: {
    ClosePopup
  },

  props: {
    modelValue: { type: Boolean, default: false, required: true },
    loading: { type: Boolean, default: false },
    title: { type: String, default: '' },
    height: { type: String, default: '500px' },
    spinnerSize: { type: String, default: '50px' },
    hideSave: { type: Boolean, default: false }
  },

  emits: ['update:modelValue', 'update:loading', 'save'],

  setup(props, { emit }) {
    const showDialog = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const showLoading = computed({
      get: () => props.loading,
      set: newValue => {
        emit('update:loading', newValue);
      }
    });

    const onSave = async () => {
      showLoading.value = true;
      emit('save');
    };

    return {
      showDialog,
      showLoading,
      onSave
    };
  }
});
</script>
