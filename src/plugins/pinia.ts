import type { App } from 'vue';

import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(
	createPersistedState({
		storage: localStorage,
		beforeRestore: () => {},
		afterRestore: () => {},
		serializer: {
			serialize: JSON.stringify,
			deserialize: JSON.parse,
		},
	})
);

export const setupStore = (app: App<Element>) => {
	app.use(pinia);
};
