<template>
  <q-dialog v-model="showDialog" persistent v-bind="$attrs">
    <q-card class="q-py-none" :style="`min-width: ${height}`">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn v-if="!hideClose" icon="close" flat round dense @click="onClose()" />
      </q-card-section>

      <q-card-section>
        <slot></slot>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn v-if="!hideCancel" label="取消" color="red" @click="onCancel()" />
        <q-btn v-if="!hideConfirm" :label="confirmLabel" color="primary" @click="onConfirm()" />
      </q-card-actions>

      <q-inner-loading :showing="showLoading">
        <q-spinner-dots :size="spinnerSize" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {
  QBtn,
  QCard,
  QCardActions,
  QCardSection,
  QDialog,
  QInnerLoading,
  QSpace,
  QSpinnerDots,
} from 'quasar';

defineOptions({
  name: 'HDialog',
  components: {
    QDialog,
    QCard,
    QCardSection,
    QSpace,
    QBtn,
    QCardActions,
    QInnerLoading,
    QSpinnerDots,
  },
});

interface Props {
  title?: string;
  height?: string;
  confirmLabel?: string;
  spinnerSize?: string;
  hideConfirm?: boolean;
  hideCancel?: boolean;
  hideClose?: boolean;
  /**
   * 由组件外部，即父组件决定是否关闭对话框。
   * 正常情况下，点击 confirm 即关闭对话框。但这不适用于需要外部接入的情况，比如说表单校验，所以增加该参数，由外部逻辑控制对话框的关闭与否。
   */
  externalClose?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  height: '500px',
  confirmLabel: '确认',
  spinnerSize: '50px',
  hideConfirm: false,
  hideCancel: false,
  hideClose: false,
  /**
   * 由组件外部，即父组件决定是否关闭对话框。
   * 正常情况下，点击 confirm 即关闭对话框。但这不适用于需要外部接入的情况，比如说表单校验，所以增加该参数，由外部逻辑控制对话框的关闭与否。
   */
  externalClose: false,
});

const showDialog = defineModel({
  type: Boolean,
  default: false,
  required: true,
});

const showLoading = defineModel('loading', {
  type: Boolean,
  default: false,
});

const emit = defineEmits<{
  close: [];
  cancel: [];
  confirm: [];
}>();

const onClose = () => {
  showDialog.value = false;
  emit('close');
};

const onCancel = () => {
  showDialog.value = false;
  emit('cancel');
};

const onConfirm = () => {
  showLoading.value = true;
  if (!props.externalClose) {
    showDialog.value = false;
  }
  emit('confirm');
};
</script>
