<template>
  <h-row justify="center" gutter="xs">
    <h-column :cols="9">
      <q-btn v-if="!hasConfig" round color="primary" icon="mdi-wechat" />
      <template v-else>
        <q-btn v-for="(value, key, index) in list" flat round :key="index" :href="value" target="_blank">
          <q-avatar size="30px">
            <img :src="getImage(key)" />
          </q-avatar>
        </q-btn>
      </template>
    </h-column>
    <h-column :cols="2">
      <q-btn color="primary" icon="mdi-login" :href="authorizationCodeUrl"></q-btn>
    </h-column>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, onMounted } from 'vue';
import { getSocialLogo, lodash, api, variables } from '/@/lib/utils';
import { useCryptoStore } from '/@/stores';

export default defineComponent({
  name: 'HSocialSiginList',

  setup() {
    const list = ref({}) as Ref<Record<string, string>>;

    const store = useCryptoStore();

    const init = () => {
      api
        .open()
        .getSocialList()
        .then(result => {
          list.value = result.data as Record<string, string>;
        });
    };

    const getImage = (source: string) => {
      const name = source.toLowerCase();
      return getSocialLogo(name);
    };

    const createAuthorizationCodeAddress = () => {
      const project = api.getConfig().getProject();
      let address = variables.getApiUrl();
      if (project && (project === 'dante' || project === 'herodotus')) {
        address = api.getConfig().getUaa();
      }
      if (lodash.endsWith(address, '/')) {
        address = address.substring(0, address.length - 1);
      }
      return address + '/oauth2/authorize';
    };

    const createAuthorizationCodeParams = () => {
      const param = `?response_type=code&client_id=${variables.getClientId()}&client_secret=${variables.getClientSecret()}&redirect_uri=${variables.getRedirectUri()}`;
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
      authorizationCodeUrl
    };
  }
});
</script>
