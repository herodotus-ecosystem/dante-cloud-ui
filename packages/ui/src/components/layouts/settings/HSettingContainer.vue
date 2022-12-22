<template>
  <h-container wider="center" :offset="6">
    <h-row class="justify-center">
      <h-column :cols="2">
        <q-page-container>
          <q-page class="q-pt-md">
            <q-card>
              <q-item>
                <q-item-section avatar>
                  <h-user-avatar rounded size="48px"></h-user-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-h5">{{ userName }}</q-item-label>
                </q-item-section>
              </q-item>

              <h-setting-menu></h-setting-menu>
            </q-card>
          </q-page>
        </q-page-container>
      </h-column>
      <h-column :cols="10"><h-app-container></h-app-container></h-column>
    </h-row>
  </h-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HAppContainer, HUserAvatar } from '../common';
import HSettingMenu from './HSettingMenu.vue';

import { useAuthenticationStore } from '/@/stores';

export default defineComponent({
  name: 'HSettingContainer',

  components: {
    HAppContainer,
    HSettingMenu,
    HUserAvatar
  },

  setup() {
    const authenticationStore = useAuthenticationStore();

    const userName = authenticationStore.userName;

    return {
      userName
    };
  }
});
</script>
