<template>
  <q-page-container>
    <q-page class="q-pa-md">
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="keepAlives">
          <suspense>
            <template #default>
              <transition
                appear
                mode="out-in"
                :duration="500"
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut"
              >
                <component :is="getComponent(Component, route)" />
              </transition>
            </template>

            <template #fallback>
              <h-loading type="DOTS" size="100px"></h-loading>
            </template>
          </suspense>
        </keep-alive>
      </router-view>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import type { VNode, RendererNode, RendererElement } from 'vue';
import { defineComponent, defineAsyncComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import type { RouteLocationNormalizedLoaded } from 'vue-router';

import { useRouteStore } from '/@/stores';

export default defineComponent({
  name: 'HAppContainer',

  setup() {
    const route = useRoute();
    const store = useRouteStore();
    const { cachedRoutes } = storeToRefs(store);

    const keepAlives = cachedRoutes.value;

    const getComponent = (
      component: VNode<RendererNode, RendererElement, { [key: string]: any }>,
      route: RouteLocationNormalizedLoaded,
    ) => {
      // @ts-ignore
      if (component.type.name !== route.name && store.isValidDetailRoute(route)) {
        return defineAsyncComponent({
          loader: store.getDetailComponent(route.name as string),
          delay: 2000,
        });
      }

      return component;
    };

    watch(
      () => route.path,
      () => {
        store.addCachedRoute(route);
      },
      {
        immediate: true,
      },
    );

    return {
      keepAlives,
      getComponent,
    };
  },
});
</script>
