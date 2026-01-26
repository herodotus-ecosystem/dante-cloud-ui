<template>
  <div></div>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, onMounted, ref } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

import type { SocialSource, AccessPrincipal } from '@herodotus-cloud/framework-kernel';
import { useAuthenticationStore } from '@herodotus-cloud/framework-kernel';
import { isEmpty } from 'lodash-es';

export default defineComponent({
  name: 'SocialSignInCallback',

  setup() {
    const route = useRoute();
    const router = useRouter();

    const source = ref() as Ref<SocialSource>;
    const accessPrincipal = ref({}) as Ref<AccessPrincipal>;

    const getAccessPrincipal = (
      source: SocialSource,
      route: RouteLocationNormalizedLoaded,
    ): AccessPrincipal => {
      if (route && !isEmpty(route.query)) {
        switch (source) {
          case 'WXAPP':
            break;
          default:
            accessPrincipal.value.code = route.query.code as string;
            accessPrincipal.value.state = route.query.state as string;
            break;
        }
      }

      return accessPrincipal.value;
    };

    const initParams = () => {
      if (route && !isEmpty(route.params) && route.params.source) {
        source.value = route.params.source as SocialSource;
        getAccessPrincipal(source.value, route);
      }
    };

    onMounted(() => {
      initParams();
      if (accessPrincipal.value.state) {
        const authentication = useAuthenticationStore();
        authentication.socialSignIn(source.value, accessPrincipal.value).then(() => {
          router.push('/');
        });
      }
    });

    return {
      source,
      accessPrincipal,
    };
  },
});
</script>
