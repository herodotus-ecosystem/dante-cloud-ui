import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import UnpluginVueComponents from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

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
			UnpluginVueComponents({
				dts: true,
				resolvers: [
					IconsResolver({
						customCollections: ['custom'],
					}),
				],
			}),
			Icons({
				compiler: 'vue3',
				customCollections: {
					// 这里是存放svg图标的文件地址，custom是自定义图标库的名称
					custom: FileSystemIconLoader('./src/assets/svg'),
				},
			}),
		],
		define: { 'process.env': loadEnv(mode, process.cwd()) },
		resolve: {
			alias: {
				'/@': path.resolve(__dirname, 'src'),
			},
		},
	});
