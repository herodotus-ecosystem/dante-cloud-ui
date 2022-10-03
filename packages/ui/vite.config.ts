import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { QuasarResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

import viteCommpressPlugin from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';

import { visualizer } from 'rollup-plugin-visualizer';

import path from 'path';

const lifecycle = process.env.npm_lifecycle_event;

// https://vitejs.dev/config/
// mode 环境变量名，若配置有.env.test，启动时 --mode test，这里的mode就是test
export default ({ mode }) =>
  defineConfig({
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      quasar({
        sassVariables: 'src/static/styles/quasar.variables.sass'
      }),
      AutoImport({
        dts: true,
        imports: ['vue', 'vue-router', 'vue-i18n', 'pinia', 'quasar']
      }),
      Components({
        dts: true,
        resolvers: [
          QuasarResolver(),
          IconsResolver({
            customCollections: ['custom']
          })
        ]
      }),
      Icons({
        compiler: 'vue3',
        customCollections: {
          // 这里是存放svg图标的文件地址，custom是自定义图标库的名称
          custom: FileSystemIconLoader('./src/assets/svg')
        }
      }),
      viteCommpressPlugin({
        verbose: true, // 默认即可
        disable: false, //开启压缩(不禁用)，默认即可
        deleteOriginFile: false, //删除源文件
        threshold: 10240, //压缩前最小文件大小
        algorithm: 'gzip', //压缩算法
        ext: '.gz' //文件类型
      }),
      createHtmlPlugin({
        inject: {
          data: {
            // 查找.env.test文件里面的VITE_PROJECT_TITLE，请以VITE_标识开头
            title: loadEnv(mode, process.cwd()).VITE_PROJECT_NAME
          }
        }
      }),
      lifecycle === 'report' ? visualizer({ open: true, brotliSize: true, filename: 'report.html' }) : null
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/static/styles/global.scss" as *;`
        }
      }
    },
    define: { 'process.env': loadEnv(mode, process.cwd()) },
    resolve: {
      alias: {
        '/@': path.resolve(__dirname, 'src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    server: {
      port: 3000
    },
    build: {
      // chunkSizeWarningLimit: 1000,
      outDir: './container/context/dist',
      minify: 'terser',
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      terserOptions: {
        // 生产环境下移除console
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id, { getModuleInfo }) {
            if (id.includes('tsparticles')) {
              return 'npm-tsparticles';
            } else if (id.includes('node_modules')) {
              return 'npm-' + id.toString().split('node_modules/')[1].split('/')[0].toString();
            } else if (id.includes('src')) {
              return 'manifest';
            }
          }
        }
      }
    }
  });
