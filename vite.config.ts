import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

const path = require('path');

// https://vitejs.dev/config/
export default ({ mode }) =>
	defineConfig({
		plugins: [
			vue({
				template: { transformAssetUrls },
			}),
			quasar({
				sassVariables: 'src/static/styles/quasar.variables.sass',
			}),
		],
		define: { 'process.env': loadEnv(mode, process.cwd()) },
		resolve: {
			alias: {
				'/@': path.resolve(__dirname, 'src'),
			},
		},
	});
