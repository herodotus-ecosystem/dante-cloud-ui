import { useRoute } from 'vue-router';
import { useTabsStore, useRouteStore, useSettingsStore } from '/@/stores';
import { RouteUtils } from '/@/lib/utils';

export default function useEditFinish() {
  const route = useRoute();
  const routeStore = useRouteStore();
  const tabs = useTabsStore();
  const settingsStore = useSettingsStore();

  const onFinish = () => {
    const name = route.name as string;

    routeStore.removeRoutePushParam(name);
    tabs.deleteTab(route);
    if (!settingsStore.display.isTabsView) {
      RouteUtils.goBack();
    }
  };

  return {
    onFinish
  };
}
