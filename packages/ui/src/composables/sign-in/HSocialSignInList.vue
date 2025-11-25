<template>
  <h-row justify="center" gutter="xs">
    <q-btn v-if="!hasConfig" round color="primary" icon="mdi-wechat" />
    <template v-else>
      <q-btn
        v-for="(value, key, index) in list"
        flat
        round
        :key="index"
        :href="value"
        target="_blank"
      >
        <q-avatar size="30px">
          <img :src="getImage(key)" />
        </q-avatar>
      </q-btn>
    </template>
    <h-button
      color="primary"
      icon="mdi-login"
      round
      flat
      :href="authorizationCodeUrl"
      tooltip="授权码模式登录"
    ></h-button>
  </h-row>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref, computed, onMounted } from 'vue';
import { lodash, PKCE } from '@/lib/utils';
import { VARIABLES, IMAGES, API } from '@/configurations';
import { SecurityApiResources } from '@herodotus-cloud/framework-kernel';

export default defineComponent({
  name: 'HSocialSignInList',

  setup() {
    const list = ref({}) as Ref<Record<string, string>>;

    const init = () => {
      SecurityApiResources.getInstance()
        .open()
        .getSocialList()
        .then((result) => {
          list.value = result.data as Record<string, string>;
        });
    };

    const getImage = (source: string) => {
      const name = source.toLowerCase();
      return IMAGES.getSocialLogo(name);
    };

    const createAuthorizationCodeAddress = () => {
      const project = API.core.getConfig().getProject();
      let address = VARIABLES.getApiUrl();
      if (lodash.endsWith(address, '/')) {
        address = address.substring(0, address.length - 1);
      }

      if (project && (project === 'dante' || project === 'herodotus')) {
        address += API.core.getConfig().getUaa(false);
      }

      return address + '/oauth2/authorize';
    };

    const createAuthorizationCodeParams = () => {
      const param = `?response_type=code&client_id=${VARIABLES.getClientId()}&client_secret=${VARIABLES.getClientSecret()}&redirect_uri=${VARIABLES.getRedirectUri()}&scope=openid`;
      console.log('---pkce---', PKCE.generateCodePair(64));
      return param;
    };

    const hasConfig = computed(() => {
      return !lodash.isEmpty(list.value);
    });

    const authorizationCodeUrl = computed(() => {
      return createAuthorizationCodeAddress() + createAuthorizationCodeParams();
    });

    onMounted(() => {
      init();
    });

    return {
      list,
      getImage,
      hasConfig,
      authorizationCodeUrl,
    };
  },
});
</script>
