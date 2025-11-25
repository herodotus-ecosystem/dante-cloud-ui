<template>
  <h-button-dropdown label="下载" icon="mdi-download-box">
    <h-list-item label="下载 XML" icon="mdi-xml" @click="onDownloadXml()"></h-list-item>
    <q-separator spaced inset />
    <h-list-item label="下载 SVG" icon="mdi-svg" @click="onDownloadSvg()"></h-list-item>
    <q-separator spaced inset />
    <h-list-item label="下载 BPMN" icon="mdi-code-tags" @click="onDownloadBpmn()"></h-list-item>
  </h-button-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useDesignerStore } from '@/stores';

import { HButtonDropdown, HListItem } from '../../widgets';
import { Logger } from '@/lib/utils';

export default defineComponent({
  name: 'HDownloadDropdown',

  components: {
    HButtonDropdown,
    HListItem,
  },

  setup() {
    const designer = useDesignerStore();

    /**
     * 文件下载
     */
    const download = (href: string, filename: string) => {
      if (href && filename) {
        const a = document.createElement('a');
        a.download = filename; //指定下载的文件名
        a.href = href; //  URL对象
        a.click(); // 模拟点击
        URL.revokeObjectURL(a.href); // 释放URL 对象
      }
    };

    /**
     * 根据所需类型进行转码并返回下载地址
     */
    const downloadEncode = (type: string, filename = 'diagram', data = '') => {
      const encodedData = encodeURIComponent(data);
      return {
        filename: `${filename}.${type}`,
        href: `data:application/${type === 'svg' ? 'text/xml' : 'bpmn20-xml'};charset=UTF-8,${encodedData}`,
        data: data,
      };
    };

    const downloadProcess = async (type: string, name = 'diagram') => {
      try {
        if (type === 'xml' || type === 'bpmn') {
          const { xml } = await designer.modeler.saveXML();
          const { href, filename } = downloadEncode(type, name, xml);
          download(href, filename);
        } else {
          const { svg } = await designer.modeler.saveSVG();
          const { href, filename } = downloadEncode('svg', name, svg);
          download(href, filename);
        }
      } catch (error: any) {
        Logger.prettyError('Could not download diagram!', error);
      }
    };

    const onDownloadXml = () => {
      downloadProcess('xml');
    };

    const onDownloadSvg = () => {
      downloadProcess('svg');
    };

    const onDownloadBpmn = () => {
      downloadProcess('bpmn');
    };

    return {
      onDownloadXml,
      onDownloadSvg,
      onDownloadBpmn,
    };
  },
});
</script>
