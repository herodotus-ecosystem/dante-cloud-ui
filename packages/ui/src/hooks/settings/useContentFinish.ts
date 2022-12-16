import { useRoute } from 'vue-router';
import { useRouteStore } from '/@/stores';
import { RouteUtils } from '/@/lib/utils';

export default function useContentFinish() {
  const route = useRoute();
  const routeStore = useRouteStore();

  const onFinish = () => {
    const name = route.name as string;

    console.log(name);
    console.log(route);

    routeStore.removeRoutePushParam(name);
    RouteUtils.goBack();
  };

  return {
    onFinish
  };
}
