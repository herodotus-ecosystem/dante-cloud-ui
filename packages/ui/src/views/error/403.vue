<template>
  <h-error-layout>
    <icon-no-permission height="80vh" width="100%" />
  </h-error-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HErrorLayout } from '@/components';
import IconNoPermission from '~icons/custom/no-permission';

export default defineComponent({
  name: 'NoPermission',

  components: {
    IconNoPermission,
    HErrorLayout,
  },
});
</script>
