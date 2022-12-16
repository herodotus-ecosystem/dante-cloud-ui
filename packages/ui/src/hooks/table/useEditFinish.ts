import { useRoute } from 'vue-router';
import { useTabsStore, useRouteStore } from '/@/stores';
import { RouteUtils } from '/@/lib/utils';

export default function useEditFinish() {
	const route = useRoute();
	const routeStore = useRouteStore();
	const tabs = useTabsStore();

	const onFinish = () => {
		const name = route.name as string;

		console.log(name);
		console.log(route);

		routeStore.removeRoutePushParam(name);
		tabs.deleteTab(route);
		RouteUtils.goBack();
	};

	return {
		onFinish,
	};
}
