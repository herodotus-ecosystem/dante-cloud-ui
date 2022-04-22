import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';

import { GlobalSetting } from '/@/lib/declarations';

export const useGlobalSettingStore = defineStore(
	'GlobalSetting',
	() => {
		const state = reactive<GlobalSetting>({
			theme: 'system',
		});

		return { ...toRefs(state) };
	},
	{
		persist: true,
	}
);
