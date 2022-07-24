import { ref, Ref } from 'vue';

import type { ConstantDictionary, AssetServer } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';
import { useConstantsStore } from '/@/stores';

export default function useServerDisplay() {
	const constants = useConstantsStore();

	const serverDevice = ref([]) as Ref<ConstantDictionary[]>;

	const parseServerDevice = (item: AssetServer) => {
		if (lodash.isEmpty(serverDevice.value)) {
			serverDevice.value = constants.getDictionary('serverDevice');
		}

		if (typeof item.deviceType == 'number') {
			return serverDevice.value[item.deviceType].text;
		} else {
			return item.deviceType;
		}
	};

	return {
		parseServerDevice,
	};
}
