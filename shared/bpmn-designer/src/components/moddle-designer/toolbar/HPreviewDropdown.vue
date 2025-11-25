<template>
  <h-button-dropdown label="预览" icon="mdi-eye">
    <h-list-item label="预览XML" icon="mdi-xml" @click="onPreviewXml()"></h-list-item>
    <q-separator spaced inset />
    <h-list-item label="预览JSON" icon="mdi-code-json" @click="onPreviewJson()"></h-list-item>
  </h-button-dropdown>
  <h-bpmn-code-previewer v-model="isOpen" :data="data" :language="language"></h-bpmn-code-previewer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useDesignerStore } from '@/stores';

import { HButtonDropdown, HListItem } from '../../widgets';
import { HBpmnCodePreviewer } from '../../moddle-viewer';
import { toast } from '@/lib/utils';
import type { ParseResult } from 'bpmn-moddle';
import BpmnModdle from 'bpmn-moddle';

export default defineComponent({
  name: 'HPreviewDropdown',

  components: {
    HButtonDropdown,
    HListItem,
    HBpmnCodePreviewer,
  },

  setup() {
    const designer = useDesignerStore();

    const isOpen = ref<boolean>(false);
    const data = ref<string>('');
    const language = ref<'xml' | 'json'>('xml');

    const onPreviewXml = async () => {
      try {
        const modeler = designer.modeler;

        if (!designer.modeler) {
          return toast.warning('模型加载失败，请刷新重试');
        }

        const { xml } = await modeler.saveXML({ format: true, preamble: true });

        if (xml) {
          language.value = 'xml';
          data.value = xml;
          isOpen.value = true;
        }
      } catch (e) {
        toast.error((e as Error).message || (e as string));
      }
    };

    const onPreviewJson = async () => {
      try {
        if (!designer.modeler) {
          return toast.warning('模型加载失败，请刷新重试');
        }

        const { xml } = await designer.modeler.saveXML({ format: true, preamble: true });

        if (xml) {
          const moddle = new BpmnModdle();
          const json = await moddle.fromXML(xml);
          if (json) {
            const result = json as ParseResult;
            language.value = 'json';
            data.value = JSON.stringify(result.elementsById, null, 2);
            isOpen.value = true;
          }
        }
      } catch (e) {
        toast.error((e as Error).message || (e as string));
      }
    };

    return {
      isOpen,
      data,
      language,
      onPreviewXml,
      onPreviewJson,
    };
  },
});
</script>
