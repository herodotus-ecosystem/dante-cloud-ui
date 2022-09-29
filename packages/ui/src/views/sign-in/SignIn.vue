<template>
  <sign-in-layout></sign-in-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import SignInLayout from './SignInLayout.vue';

export default defineComponent({
  name: 'SignIn',

  components: {
    SignInLayout
  },

  setup() {}
});
</script>
