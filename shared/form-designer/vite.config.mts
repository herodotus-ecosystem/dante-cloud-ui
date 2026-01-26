import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { transformAssetUrls } from '@quasar/vite-plugin';

import Components from 'unplugin-vue-components/vite';
import { QuasarResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    Components({
      resolvers: [QuasarResolver()],
    }),
    dts({ insertTypesEntry: true, outDir: './dist/types' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: '@herodotus-cloud/form-designer',
      fileName: (format) => (format === 'es' ? `index.${format}.mjs` : `index.${format}.js`),
    },
    minify: 'terser',
    terserOptions: {
      // 生产环境下移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      keep_classnames: true,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'lodash-es',
        'vue',
        'quasar',
        'pinia',
        '@herodotus-cloud/components',
        '@herodotus-cloud/form-engine',
        '@herodotus-cloud/form-apis',
        '@herodotus-cloud/core',
        'vuedraggable',
      ],
      output: {
        exports: 'named',
        assetFileNames: `assets/[ext]/[name][extname]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'lodash-es': 'LodashEs',
          vue: 'vue',
          quasar: 'quasar',
          pinia: 'pinia',
          '@herodotus-cloud/form-engine': 'HerodotusFormEngine',
          '@herodotus-cloud/components': 'HerodotusComponents',
          '@herodotus-cloud/core': 'HerodotusCore',
          '@herodotus-cloud/form-apis': 'HerodotusFormApis',
          vuedraggable: 'vuedraggable',
        },
      },
    },
  },
});
