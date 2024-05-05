<template>
  <q-toolbar class="q-px-none">
    <h-open-file></h-open-file>
    <h-download-dropdown></h-download-dropdown>
    <h-preview-dropdown></h-preview-dropdown>
    <h-upload-dialog></h-upload-dialog>
    <h-align-group></h-align-group>
    <h-zoom-group></h-zoom-group>
    <h-command-group></h-command-group>
    <h-tool-group></h-tool-group>
  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

import {
  HAlignGroup,
  HCommandGroup,
  HZoomGroup,
  HToolGroup,
  HDownloadDropdown,
  HPreviewDropdown,
  HOpenFile,
  HUploadDialog
} from './toolbar';

export default defineComponent({
  name: 'HBpmnDesignerToolbar',

  components: {
    HAlignGroup,
    HCommandGroup,
    HToolGroup,
    HZoomGroup,
    HDownloadDropdown,
    HPreviewDropdown,
    HOpenFile,
    HUploadDialog
  },

  setup(props, { emit }) {}
});
</script>
