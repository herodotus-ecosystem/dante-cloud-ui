import { defineStore } from 'pinia';
import type { AxiosHttpResult, ConstantDictionary } from '/@/lib/declarations';

import { useContantsApi } from '/@/apis';
import { lodash } from '/@/lib/utils';

export const useConstantsStore = defineStore('Constants', {
	state: () => ({
		enums: {} as Dictionary<ConstantDictionary[]>,
	}),

	getters: {
		getDictionary(state) {
			return (key: string): ConstantDictionary[] => (key ? state.enums[key] : []);
		},
	},

	actions: {
		fetch() {
			const api = useContantsApi();
			api.uaa.fetch().then((response) => {
				this.append(response);
				api.upms.fetch().then((response) => {
					this.append(response);
				});
			});
		},

		refresh() {
			this.fetch();
		},

		init() {
			if (lodash.isEmpty(this.enums)) {
				this.fetch();
			}
		},

		append(response: AxiosHttpResult) {
			const data = response.data;
			if (!lodash.isEmpty(data)) {
				this.enums = Object.assign(this.enums, data);
			}
		},
	},
	persist: true,
});
