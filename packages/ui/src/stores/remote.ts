import type { RemoteRoute } from '/@/lib/declarations';
import { defineStore } from 'pinia';

export const useRemoteCacheStore = defineStore('RemoteCache', {
	state: () => ({
		remoteRouteData: [] as Array<RemoteRoute>,
	}),
	persist: true,
});
