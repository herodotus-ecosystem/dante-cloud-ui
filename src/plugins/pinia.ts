import { createPinia } from 'pinia';
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';
import stringify from 'json-stringify-safe';
import localforage from 'localforage';

const _localforage = {
	getItem: async (key: string) => {
		return localforage.getItem(key);
	},
	setItem: async (key: string, value: unknown) => {
		return localforage.setItem(key, value);
	},
	removeItem: async (key: string) => {
		return localforage.removeItem(key);
	},
};

const pinia = createPinia();
pinia.use(
	createPersistedStatePlugin({
		serialize: (value) => stringify(value),
	})
);

export default pinia;
