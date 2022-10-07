<template>
  <q-item clickable v-close-popup v-ripple>
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>{{ label }}</q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// 在 monorepo 模块中定义的组件，如果使用 quasar directives，打包之后会出现找不到引用的情况，所以这里手动导入临时解决
import { ClosePopup, Ripple } from 'quasar';

export default defineComponent({
  name: 'HListItem',

  directives: {
    ClosePopup,
    Ripple
  },

  props: {
    label: { type: String },
    icon: { type: String }
  }
});
</script>
