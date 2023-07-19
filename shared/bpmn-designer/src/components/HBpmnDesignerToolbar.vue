<template>
  <q-toolbar class="bg-primary text-white q-px-none">
    <q-file v-model="bpmnModelFile" label-color="white" bg-color="primary" square standout dense clearable label="打开">
      <template v-slot:prepend>
        <q-icon name="mdi-folder-open" color="white" />
      </template>
    </q-file>
    <q-separator vertical color="white"></q-separator>
    <q-btn-dropdown stretch flat label="下载" dense icon="mdi-download-box">
      <q-list>
        <q-list>
          <h-list-item label="下载为XML文件" icon="mdi-xml" @click="onDownloadXml()"></h-list-item>
          <h-list-item label="下载为SVG文件" icon="mdi-svg" @click="onDownloadSvg()"></h-list-item>
          <h-list-item label="下载为BPMN文件" icon="mdi-codepen" @click="onDownloadBpmn()"></h-list-item>
        </q-list>
      </q-list>
    </q-btn-dropdown>
    <q-separator vertical color="white"></q-separator>
    <q-btn-dropdown stretch flat label="代码" dense icon="mdi-eye">
      <q-list>
        <q-list>
          <h-list-item label="预览XML" icon="mdi-xml"></h-list-item>
          <h-list-item label="预览JSON" icon="mdi-code-json"></h-list-item>
        </q-list>
      </q-list>
    </q-btn-dropdown>
    <q-separator vertical color="white"></q-separator>
    <h-button
      stretch
      flat
      color="primary"
      dense
      text-color="white"
      :icon="simulation ? 'mdi-play-pause' : 'mdi-play'"
      :tooltip="simulation ? '退出模拟' : '开启模拟'"
      :label="simulation ? '退出模拟' : '开启模拟'"
      @click="onSimulation()" />
    <q-separator vertical color="white"></q-separator>
    <h-button
      stretch
      flat
      color="primary"
      dense
      text-color="white"
      icon="mdi-cloud-upload"
      tooltip="上传至服务器"
      label="上传云端"
      @click="showUploadDialog = true" />
    <q-separator vertical color="white"></q-separator>
    <q-btn-group class="q-ml-sm">
      <h-button
        color="white"
        text-color="grey-8"
        class="q-px-sm"
        dense
        icon="mdi-align-horizontal-left"
        tooltip="向左对齐"
        @click="onAlignLeft()"></h-button>
      <q-separator vertical color="grey-6"></q-separator>
      <h-button
        color="white"
        text-color="grey-8"
        class="q-px-sm"
        dense
        icon="mdi-align-horizontal-right"
        tooltip="向右对齐"
        @click="onAlignRight()"></h-button>
      <q-separator vertical color="grey-6"></q-separator>
      <h-button
        color="white"
        text-color="grey-8"
        class="q-px-sm"
        dense
        icon="mdi-align-vertical-top"
        tooltip="向上对齐"
        @click="onAlignTop()"></h-button>
      <q-separator vertical color="grey-6"></q-separator>
      <h-button
        color="white"
        text-color="grey-8"
        class="q-px-sm"
        dense
        icon="mdi-align-vertical-bottom"
        tooltip="向下对齐"
        @click="onAlignBottom()"></h-button>
      <q-separator vertical color="grey-6"></q-separator>
      <h-button
        color="white"
        text-color="grey-8"
        class="q-px-sm"
        dense
        icon="mdi-align-horizontal-center"
        tooltip="水平居中"
        @click="onAlignHorizontalCenter()"></h-button>
      <q-separator vertical color="grey-6"></q-separator>
      <h-button
        color="white"
        text-color="grey-8"
        class="q-px-sm"
        dense
        icon="mdi-align-vertical-center"
        tooltip="垂直居中"
        @click="onAlignVerticalCenter()"></h-button>
    </q-btn-group>
    <q-btn-group class="q-ml-xs">
      <h-button
        color="white"
        text-color="grey-8"
        class="q-px-sm"
        dense
        icon="mdi-magnify-minus"
        tooltip="缩小视图"
        :disable="zoom < 0.2"
        @click="onZoomMinus()"></h-button>
      <q-separator vertical color="grey-6"></q-separator>
      <q-btn
        color="white"
        text-color="grey-8"
        dense
        class="q-px-sm"
        :label="Math.floor(zoom * 10 * 10) + '%'"
        disable />
      <q-separator vertical color="grey-6"></q-separator>
      <h-button
        color="white"
        text-color="grey-8"
        class="q-px-sm"
        dense
        icon="mdi-magnify-plus"
        tooltip="放大视图"
        :disable="zoom > 4"
        @click="onZoomPlus()"></h-button>
      <q-separator vertical color="grey-6"></q-separator>
      <h-button
        color="white"
        text-color="grey-8"
        class="q-px-sm"
        dense
        icon="mdi-magnify-scan"
        tooltip="重置视图并居中"
        @click="onZoomReset()"></h-button>
    </q-btn-group>
    <q-btn-group class="q-mx-xs">
      <h-button
        color="white"
        text-color="grey-8"
        class="q-px-sm"
        dense
        icon="mdi-undo-variant"
        tooltip="撤销"
        @click="onUndo" />
      <q-separator vertical color="grey-6"></q-separator>
      <h-button
        color="white"
        text-color="grey-8"
        class="q-px-sm"
        dense
        icon="mdi-redo-variant"
        tooltip="恢复"
        @click="onRedo" />
      <q-separator vertical color="grey-6"></q-separator>
      <h-button color="white" text-color="grey-8" class="q-px-sm" dense icon="mdi-refresh" @click="onRefresh" />
    </q-btn-group>
    <q-dialog v-model="showUploadDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">模型信息</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <h-text-field
            v-model="deploymentName"
            label="模型名称"
            placeholder="请输入模型名称"
            :disable="disableNameInput"></h-text-field>
          <h-switch v-model="enableDuplicateCheck" label="开启部署重复检查"></h-switch>
          <h-switch v-model="deployChangedOnly" label="仅在模型存在变化时部署"></h-switch>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="取消" color="red" v-close-popup />
          <q-btn label="部署" color="primary" @click="onSave()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, watch, PropType } from 'vue';

import type { DeploymentCreateRequestBody } from '/@/declarations';

import { HTextField, HSwitch, HListItem } from './base';

export default defineComponent({
  name: 'HBpmnDesignerToolbar',

  components: {
    HListItem,
    HSwitch,
    HTextField
  },

  props: {
    file: { type: String, required: true },
    zoom: { type: Number, default: 1 }
  },

  emits: [
    'update:file',
    'downloadXml',
    'downloadSvg',
    'downloadBpmn',
    'alignLeft',
    'alignRight',
    'alignTop',
    'alignBottom',
    'alignHorizontalCenter',
    'alignVerticalCenter',
    'zoomMinus',
    'zoomPlus',
    'zoomReset',
    'undo',
    'redo',
    'refresh',
    'simulation',
    'save'
  ],

  setup(props, { emit }) {
    const bpmnModelFile = ref(null) as Ref<File | null>;
    const simulation = ref(false);
    const showUploadDialog = ref(false);
    const name = ref('');

    const selectedFile = computed({
      get: () => props.file,
      set: newValue => {
        emit('update:file', newValue);
      }
    });

    const readFileContent = async (file: File | null) => {
      if (file) {
        const content = await file.text();
        name.value = file.name;
        if (content) {
          selectedFile.value = content;
        }
      } else {
        selectedFile.value = '';
      }
    };

    const deploymentName = ref('');
    const tenantId = ref('');
    const enableDuplicateCheck = ref(false);
    const deployChangedOnly = ref(false);
    const disableNameInput = ref(false);

    watch(bpmnModelFile, (newValue: File | null) => {
      readFileContent(newValue);
    });

    watch(
      () => name.value,
      newValue => {
        if (newValue) {
          deploymentName.value = newValue;
          disableNameInput.value = true;
        }
      },
      { immediate: true }
    );

    watch(
      deployChangedOnly,
      newValue => {
        if (newValue) {
          enableDuplicateCheck.value = true;
        }
      },
      { immediate: true }
    );

    const onDownloadXml = () => {
      emit('downloadXml');
    };

    const onDownloadSvg = () => {
      emit('downloadSvg');
    };

    const onDownloadBpmn = () => {
      emit('downloadBpmn');
    };

    const onAlignLeft = () => {
      emit('alignLeft');
    };

    const onAlignRight = () => {
      emit('alignRight');
    };

    const onAlignTop = () => {
      emit('alignTop');
    };

    const onAlignBottom = () => {
      emit('alignBottom');
    };

    const onAlignHorizontalCenter = () => {
      emit('alignHorizontalCenter');
    };

    const onAlignVerticalCenter = () => {
      emit('alignVerticalCenter');
    };

    const onZoomMinus = () => {
      emit('zoomMinus');
    };

    const onZoomPlus = () => {
      emit('zoomPlus');
    };

    const onZoomReset = () => {
      emit('zoomReset');
    };

    const onUndo = () => {
      emit('undo');
    };

    const onRedo = () => {
      emit('redo');
    };

    const onRefresh = () => {
      emit('refresh');
    };

    const onSimulation = () => {
      simulation.value = !simulation.value;
      emit('simulation');
    };

    const onSave = () => {
      showUploadDialog.value = false;

      const data: DeploymentCreateRequestBody = {
        deploymentName: deploymentName.value,
        enableDuplicateFiltering: enableDuplicateCheck.value,
        deployChangedOnly: deployChangedOnly.value,
        resource: selectedFile.value
      };

      emit('save', data);
    };

    return {
      bpmnModelFile,
      onDownloadXml,
      onDownloadSvg,
      onDownloadBpmn,
      onAlignLeft,
      onAlignRight,
      onAlignTop,
      onAlignBottom,
      onAlignHorizontalCenter,
      onAlignVerticalCenter,
      onZoomMinus,
      onZoomPlus,
      onZoomReset,
      onUndo,
      onRedo,
      onRefresh,
      simulation,
      onSimulation,
      showUploadDialog,
      onSave,
      name,
      deploymentName,
      tenantId,
      enableDuplicateCheck,
      deployChangedOnly,
      disableNameInput
    };
  }
});
</script>
