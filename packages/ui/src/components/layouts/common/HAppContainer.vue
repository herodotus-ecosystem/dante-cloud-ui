<template>
  <q-page-container>
    <q-page class="q-pa-md">
      <router-view v-slot="{ Component, route }">
        <transition
          appear
          :css="enableTransition"
          mode="out-in"
          :duration="200"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut">
          <keep-alive :include="keepAlives">
            <suspense>
              <template #default>
                <div>
                  <component :is="getComponent(Component, route)" />
                </div>
              </template>

              <template #fallback>
                <h-loading type="DOTS" size="100px"></h-loading>
              </template>
            </suspense>
          </keep-alive>
        </transition>
      </router-view>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, watch, VNode, RendererNode, RendererElement, ref } from 'vue';

import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { useRouteStore } from '/@/stores';

export default defineComponent({
  name: 'HAppContainer',

  setup() {
    const route = useRoute();
    const store = useRouteStore();
    const { cachedRoutes } = storeToRefs(store);
    const $q = useQuasar();

    const enableTransition = ref(true);

    const keepAlives = cachedRoutes.value;

    const getComponent = (
      component: VNode<RendererNode, RendererElement, { [key: string]: any }>,
      route: RouteLocationNormalizedLoaded
    ) => {
      // @ts-ignore
      if (component.type.name !== route.name && store.isValidDetailRoute(route)) {
        return defineAsyncComponent({
          loader: store.getDetailComponent(route.name as string),
          suspensible: true,
          delay: 2000
        });
      }

      return component;
    };

    watch(
      () => route.path,
      () => {
        enableTransition.value = true;
        store.addCachedRoute(route);
      },
      {
        immediate: true
      }
    );

    watch(
      () => $q.screen.name,
      () => {
        enableTransition.value = false;
      },
      {
        immediate: true
      }
    );

    return {
      keepAlives,
      store,
      getComponent,
      enableTransition
    };
  }
});
</script>
