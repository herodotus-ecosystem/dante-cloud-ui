import { useRoute } from 'vue-router';
import { useTabsStore, useRouteStore } from '@/stores';
import { RouteUtils } from '@/lib/utils';
import { useSettingsStore } from '@/stores';

export default function useEditFinish() {
  const route = useRoute();
  const routeStore = useRouteStore();
  const tabsStore = useTabsStore();
  const settingsStore = useSettingsStore();

  const onFinish = () => {
    const name = route.name as string;
    // console.log('useEditFinish.ts - name:', name);
    // console.log('useEditFinish.ts - route:', route);
    routeStore.removeRoutePushParam(name);
    tabsStore.deleteTab(route);
    if (!settingsStore.display.isTabsView) {
      RouteUtils.goBack();
    }
  };

  return {
    onFinish,
  };
}
