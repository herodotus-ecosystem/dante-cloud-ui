<template>
  <div class="q-gutter-sm row items-center no-wrap">
    <h-app-widget-actions></h-app-widget-actions>
    <q-btn
      round
      dense
      flat
      color="grey-8"
      @click="$q.fullscreen.toggle()"
      :icon="$q.fullscreen.isActive ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
      v-if="$q.screen.gt.sm">
      <q-tooltip>{{ $q.fullscreen.isActive ? '退出全屏' : '全屏显示' }}</q-tooltip>
    </q-btn>
    <h-app-message-actions v-if="message"></h-app-message-actions>
    <h-app-right-drawer-control></h-app-right-drawer-control>
    <q-btn-dropdown stretch flat class="q-mx-none">
      <template v-slot:label>
        <h-user-avatar size="28px" from-store></h-user-avatar>
      </template>
      <q-list>
        <q-item-label header>功能菜单</q-item-label>
        <h-list-item icon="mdi-home-account" label="个人主页" to="/foundation/profile"></h-list-item>
        <h-list-item icon="mdi-cog-outline" label="个人设置" to="/foundation/account"></h-list-item>
        <q-separator inset spaced />
        <q-item-label header>系统操作</q-item-label>
        <h-list-item icon="mdi-logout" label="退出系统" @click="signOut()"></h-list-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { ActionUtils, toast } from '/@/lib/utils';

import { useAuthenticationStore } from '/@/stores';

import HAppRightDrawerControl from './HAppRightDrawerControl.vue';
import HAppWidgetActions from './HAppWidgetActions.vue';
import HAppMessageActions from './HAppMessageActions.vue';
import HUserAvatar from '../avatar/HUserAvatar.vue';

export default defineComponent({
  name: 'HAppToolbarActions',

  components: {
    HAppRightDrawerControl,
    HAppWidgetActions,
    HAppMessageActions,
    HUserAvatar
  },

  props: {
    message: { type: Boolean, default: false }
  },

  setup() {
    const authentication = useAuthenticationStore();
    const signOut = () => {
      ActionUtils.signOutWithDialog();
    };

    const userName = computed(() => {
      return authentication.userName ? authentication.userName : '系统用户';
    });

    return {
      signOut,
      userName
    };
  }
});
</script>
