import { useRoute } from 'vue-router';
import { useTabsStore } from '/@/stores';
import { RouteUtils } from '/@/lib/utils';

export default function useEditFinish() {
	const route = useRoute();
	const tabs = useTabsStore();

	const onFinish = () => {
		tabs.deleteTab(route);
		RouteUtils.goBack();
	};

	return {
		onFinish,
	};
}
