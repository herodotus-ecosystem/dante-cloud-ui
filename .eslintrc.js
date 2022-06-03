module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 12,
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-essential', 'prettier'],
	plugins: ['vue', '@typescript-eslint'],
	globals: {
		ga: 'readonly', // Google Analytics
		cordova: 'readonly',
		__statics: 'readonly',
		__QUASAR_SSR__: 'readonly',
		__QUASAR_SSR_SERVER__: 'readonly',
		__QUASAR_SSR_CLIENT__: 'readonly',
		__QUASAR_SSR_PWA__: 'readonly',
		process: 'readonly',
		Capacitor: 'readonly',
		chrome: 'readonly',
	},
	rules: {
		// http://eslint.cn/docs/rules/
		// https://eslint.vuejs.org/rules/
		'prettier/prettier': 'off',
		// The Follow config only works with eslint-plugin-vue v8.0.0+
		'vue/setup-compiler-macros': true,
	},
};
