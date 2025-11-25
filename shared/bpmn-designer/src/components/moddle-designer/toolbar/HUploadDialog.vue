<template>
  <div>
    <h-button-group>
      <h-button
        icon="mdi-cloud-upload"
        tooltip="上传云端"
        @click="openUploadDialog = true"
      ></h-button>
    </h-button-group>

    <q-dialog v-model="openUploadDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card>
        <q-card-section>
          <div class="text-h6">模型信息</div>
        </q-card-section>

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-input
            v-model="deploymentName"
            outlined
            dense
            label="流程名称"
            hint="流程名称是该流程主要显示名称，请使用规范准确的文字描述"
            :rules="[(val) => !!val || '流程名称不能为空']"
            placeholder="请输入流程名称"
          ></q-input>
          <q-toggle
            v-model="enableDuplicateCheck"
            label="开启部署重复检查"
            :true-value="true"
            :false-value="false"
          ></q-toggle>
          <q-toggle
            v-model="deployChangedOnly"
            label="仅在模型存在变化时部署"
            :true-value="true"
            :false-value="false"
          ></q-toggle>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="取消" color="red" @click="openUploadDialog = false" />
          <q-btn label="发布" color="primary" @click="onSave()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useQuasar, QSpinnerGears } from 'quasar';

import type { SweetAlertResult, DeploymentCreateRequestBody } from '@/declarations';

import { useDesignerStore, useResourceStore } from '@/stores';
import { toast, Swal } from '@/lib/utils';

import { HButton, HButtonGroup } from '../../widgets';

export default defineComponent({
  name: 'HUploadDialog',

  components: {
    HButton,
    HButtonGroup,
  },

  props: {
    tooltip: { type: String, default: '' },
  },

  setup() {
    const loading = ref<boolean>(false);
    const openUploadDialog = ref<boolean>(false);
    const enableDuplicateCheck = ref<boolean>(false);
    const deployChangedOnly = ref<boolean>(false);
    const deploymentName = ref<string>('');

    const $q = useQuasar();
    const designer = useDesignerStore();
    const resource = useResourceStore();

    const showLoading = () => {
      $q.loading.show({
        spinner: QSpinnerGears,
        message: '<span class="text-amber text-italic">发布中， 请稍后...</span>',
        html: true,
      });
    };

    const hideLoading = () => {
      $q.loading.hide();
    };

    const showComfirm = () => {
      Swal.fire({
        title: '发布成功！',
        text: '您是否需要关闭设计器？',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确定!',
        cancelButtonText: '取消',
        showClass: {
          popup: 'animate__animated animate__fadeIn',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut',
        },
      }).then((confirm: SweetAlertResult) => {
        if (confirm.value) {
          designer.isClosed = true;
        }
      });
    };

    const onSave = async () => {
      openUploadDialog.value = false;
      showLoading();

      try {
        if (!designer.modeler) {
          return toast.warning('模型加载失败，请刷新重试');
        }

        const { xml } = await designer.modeler.saveXML();

        const data: DeploymentCreateRequestBody = {
          deploymentName: deploymentName.value,
          enableDuplicateFiltering: enableDuplicateCheck.value,
          deployChangedOnly: deployChangedOnly.value,
          resource: xml as string,
        };

        await resource.deploymentService.create(data);

        hideLoading();
        showComfirm();
      } catch (e) {
        toast.error((e as Error).message || (e as string));
      }
    };

    watch(
      deployChangedOnly,
      (newValue) => {
        if (newValue) {
          enableDuplicateCheck.value = true;
        } else {
          enableDuplicateCheck.value = false;
        }
      },
      { immediate: true },
    );

    return {
      openUploadDialog,
      enableDuplicateCheck,
      deployChangedOnly,
      deploymentName,
      loading,
      onSave,
    };
  },
});
</script>
