/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare interface ImportMetaEnv {
	readonly VITE_APP_SYSTEM_NAME: string;
	readonly VITE_APP_GATEWAY_ADDRESS: string;
	readonly VITE_APP_PROJECT: string;
	readonly VITE_APP_SECRET_KEY: string;
	readonly VITE_APP_CAPTCHA: string;
	readonly VITE_OAUTH2_CLIENT_ID: string;
	readonly VITE_OAUTH2_CLIENT_SECRET: string;
	readonly VITE_OAUTH2_GRANT_TYPE: string;

	// 更多环境变量...
}

/**
 * The type of `import.meta`.
 *
 * If you need to declare that a given property exists on `import.meta`,
 * this type may be augmented via interface merging.
 */
declare interface ImportMeta {
	readonly env: ImportMetaEnv;
}
