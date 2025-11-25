<template>
  <q-layout
    view="lHr LpR lfr"
    :container="container"
    class="bg-grey-2"
    :style="`height: ${height}`"
  >
    <q-header bordered class="text-primary bg-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>{{ title }}</q-toolbar-title>
        <q-btn flat round dense icon="mdi-eye" class="q-mr-xs" @click="openPreview = true" />
        <q-btn flat round dense icon="mdi-cloud-upload" @click="openUpload = true" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
      <h-widget-panel></h-widget-panel>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" behavior="desktop" bordered>
      <h-property-panel></h-property-panel>
    </q-drawer>

    <h-canvas-container></h-canvas-container>
    <h-form-preview-dialog v-model="openPreview"></h-form-preview-dialog>
    <h-form-upload-dialog v-model="openUpload"></h-form-upload-dialog>
  </q-layout>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, onUnmounted, watch } from 'vue';

import type { FormDesignerResources, DynamicFormEntity } from '@/declarations';

import { useFormResourceStore, useFormCanvasStore } from '@/stores';
import { HWidgetPanel, HPropertyPanel } from './canvas-panel';
import { HCanvasContainer } from './canvas';
import { HFormPreviewDialog, HFormUploadDialog } from './canvas-toolbar';

export default defineComponent({
  name: 'HDynamicForms',

  components: {
    HWidgetPanel,
    HPropertyPanel,
    HCanvasContainer,
    HFormPreviewDialog,
    HFormUploadDialog,
  },

  props: {
    instance: { type: Object as PropType<FormDesignerResources>, required: true },
    title: { type: String, default: 'Dante Cloud Form Designer' },
    container: { type: Boolean, default: false },
    height: { type: String, default: '90vh' },
    item: { type: Object as PropType<DynamicFormEntity>, default: () => ({}) },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const openPreview = ref(false);
    const openUpload = ref(false);

    const resource = useFormResourceStore();
    const canvas = useFormCanvasStore();

    watch(
      () => props.item,
      (newValue) => {
        resource.init(props.instance);
        canvas.loading(newValue);
      },
      { deep: true, immediate: true },
    );

    watch(
      () => canvas.isClosed,
      (newValue) => {
        if (newValue) {
          emit('close');
        }
      },
    );

    onUnmounted(() => {
      resource.$reset();
      canvas.$reset();
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },

      openPreview,
      openUpload,
    };
  },
});
</script>
