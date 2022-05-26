import { defineStore } from 'pinia';

export const useConstantsStore = defineStore('Constants', {
	state: () => ({
		sessionId: '',
		key: '',
	}),
});
