import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv, UserConfigExport, ConfigEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import UnoCSS from 'unocss/vite';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { QuasarResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

import { compression } from 'vite-plugin-compression2';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteVConsole } from 'vite-plugin-vconsole';
import VueDevTools from 'vite-plugin-vue-devtools';

import { visualizer } from 'rollup-plugin-visualizer';

const lifecycle = process.env.npm_lifecycle_event;

// https://vitejs.dev/config/
// mode 环境变量名，若配置有.env.test，启动时 --mode test，这里的mode就是test
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    // 增加基础路径配置，修复在反向代理指向子路径的配置方式下，出现静态资源 404 问题
    base: env.VITE_BASE_PATH,
    plugins: [
      UnoCSS({
        configFile: './uno.config.ts',
      }),
      VueDevTools(),
      Vue({
        template: { transformAssetUrls },
      }),
      quasar({
        sassVariables: fileURLToPath(
          new URL('./src/static/styles/quasar.variables.sass', import.meta.url),
        ),
      }),
      AutoImport({
        dts: 'types/auto-imports.d.ts',
        imports: [
          'vue',
          'quasar',
          {
            pinia: ['defineStore', 'storeToRefs'],
          },
        ],
        eslintrc: {
          enabled: true,
        },
        vueTemplate: true,
      }),
      Components({
        dts: 'types/components.d.ts',
        resolvers: [
          QuasarResolver(),
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
      compression(),
      // VConsole 调试工具配置，若没有此配置，则调试工具控制台不会打印日志
      viteVConsole({
        entry: [fileURLToPath(new URL('./src/main.ts', import.meta.url))], // entry file
        enabled: command !== 'build' || mode === 'development', // build production
        config: {
          // vconsole options
          maxLogNumber: 1000,
          theme: 'light',
        },
      }),
      createHtmlPlugin({
        inject: {
          data: {
            // 查找.env.test文件里面的VITE_PROJECT_TITLE，请以VITE_标识开头
            title: env.VITE_PROJECT_NAME,
          },
        },
      }),
      lifecycle === 'report'
        ? visualizer({ open: true, brotliSize: true, filename: 'report.html' })
        : null,
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/static/styles/global.scss" as *;`,
        },
      },
    },
    optimizeDeps: {
      exclude: ['vue-router'],
      include: [
        'vconsole',
        'vite-plugin-node-polyfills/shims/buffer',
        'vite-plugin-node-polyfills/shims/global',
        'vite-plugin-node-polyfills/shims/process',
      ],
    },
    define: { 'process.env': env },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url)),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.esm-bundler.js',
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/socket': {
          target: env.VITE_WS_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/socket/, ''),
        },
      },
    },
    build: {
      // chunkSizeWarningLimit: 1000,
      outDir: './container/context/dist',
      emptyOutDir: true,
      cssCodeSplit: false, // 因为使用了 Base './'，如果将该属性设置为 true，编译后 css 目录结构会产生变化，会导致 @quasar/extras 中样式找不到字体
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (
              assetInfo.type === 'asset' &&
              /\.(jpe?g|png|gif|svg)$/i.test(assetInfo.name as string)
            ) {
              return 'assets/images/[name]-[hash].[ext]';
            }
            if (
              assetInfo.type === 'asset' &&
              /\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name as string)
            ) {
              return 'assets/fonts/[name]-[hash].[ext]';
            }
            return 'assets/[ext]/[name]-[hash].[ext]';
          },
          manualChunks(id, { getModuleInfo }) {
            if (id.includes('tsparticles')) {
              return 'js/npm-tsparticles';
            } else if (id.includes('node_modules')) {
              const indexes = id.toString().split('node_modules/')[2].split('/');
              let name = indexes[0];
              if (name.includes('@')) {
                name = name + '-' + indexes[1];
              }
              return 'js/npm-' + name;
            } else if (id.includes('src')) {
              const path = id.toString().split('src/')[1].replace(/\//g, '-');
              return 'js/' + path;
            }
          },
        },
      },
    },
  });
};
