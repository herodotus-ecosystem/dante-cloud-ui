import { useRoute } from 'vue-router';
import { useTabsViewStore, useRouterStore } from '../stores';
import { RouterUtilities } from '../utilities';

export default function useEditFinish() {
  const route = useRoute();
  const routeStore = useRouterStore();
  const tabs = useTabsViewStore();

  const onFinish = () => {
    const name = route.name as string;

    routeStore.removeRoutePushParam(name);
    tabs.deleteTab(route);
    RouterUtilities.getInstance().goBack();
  };

  return {
    onFinish,
  };
}
