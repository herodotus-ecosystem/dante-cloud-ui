<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card :style="`max-width: ${maxWidth}`">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ headerTitle }}</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="isOpen = false" />
      </q-card-section>

      <q-card-section :style="`max-height: ${maxHeight}`" class="scroll q-pt-none q-pa-none">
        <q-btn
          size="sm"
          fab
          flat
          round
          dense
          color="primary"
          icon="mdi-content-copy"
          class="absolute"
          style="top: 18px; right: 14px"
          @click="onCopy()" />
        <highlightjs :language="language" :code="data" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { copyToClipboard } from 'quasar';

import { toast } from '/@/lib/utils';

import 'highlight.js/styles/stackoverflow-dark.css';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import hljsVuePlugin from '@highlightjs/vue-plugin';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);

export default defineComponent({
  name: 'HBpmnCodePreviewer',

  components: {
    highlightjs: hljsVuePlugin.component
  },

  props: {
    modelValue: { type: Boolean, required: true },
    data: { type: String, required: true },
    title: { type: String, default: '' },
    language: { type: String as PropType<'xml' | 'json'>, default: 'xml' },
    maxWidth: { type: String, default: '900px' },
    maxHeight: { type: String, default: '50vh' }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const headerTitle = computed(() => {
      if (!props.title) {
        if (props.language === 'xml') {
          return 'BPMN XML 预览';
        } else {
          return 'BPMN JSON 预览';
        }
      } else {
        return props.title;
      }
    });

    const onCopy = () => {
      copyToClipboard(props.data)
        .then(() => {
          isOpen.value = false;
          toast.success('复制成功');
        })
        .catch(() => {
          isOpen.value = false;
          toast.error('复制失败');
        });
    };

    return {
      isOpen,
      headerTitle,
      onCopy
    };
  }
});
</script>
