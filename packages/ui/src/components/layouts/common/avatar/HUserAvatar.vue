<template>
  <q-avatar v-bind="$attrs">
    <img :src="src" />
  </q-avatar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useAuthenticationStore } from '/@/stores';
import { AvatarUtils } from '/@/lib/utils';

export default defineComponent({
  name: 'HUserAvatar',

  props: {
    id: { type: String, default: '' },
    avatar: { type: String, default: '' },
    fromStore: { type: Boolean, default: false }
  },

  setup(props) {
    const authenticationStore = useAuthenticationStore();

    const defaultAvatar = 'https://cdn.quasar.dev/img/boy-avatar.png';

    const readFromStore = () => {
      if (authenticationStore.avatar) {
        return authenticationStore.avatar;
      } else {
        if (authenticationStore.userId) {
          return AvatarUtils.generate(authenticationStore.userId);
        } else {
          return defaultAvatar;
        }
      }
    };

    const readFromProps = () => {
      if (props.avatar) {
        return props.avatar;
      } else {
        if (props.id) {
          return AvatarUtils.generate(props.id);
        } else {
          return defaultAvatar;
        }
      }
    };

    const src = computed(() => {
      if (props.fromStore) {
        return readFromStore();
      } else {
        return readFromProps();
      }
    });

    return {
      src
    };
  }
});
</script>
