import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { transformAssetUrls } from '@quasar/vite-plugin';

import Components from 'unplugin-vue-components/vite';
import { QuasarResolver } from 'unplugin-vue-components/resolvers';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    Components({
      resolvers: [QuasarResolver()]
    }),
    dts({})
  ],
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, 'src'),
      '/#': path.resolve(__dirname, 'types')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@herodotus/form-designer',
      fileName: format => (format === 'es' ? `index.${format}.mjs` : `index.${format}.js`)
    },
    minify: 'terser',
    terserOptions: {
      // 生产环境下移除console
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      keep_classnames: true
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'vue',
        'quasar',
        'pinia',
        '@herodotus/components',
        '@herodotus/form-engine',
        '@herodotus/form-apis',
        '@herodotus/core',
        'vuedraggable'
      ],
      output: {
        exports: 'named',
        assetFileNames: `assets/[name].[ext]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'vue',
          quasar: 'quasar',
          pinia: 'pinia',
          '@herodotus/form-engine': 'HerodotusFormEngine',
          '@herodotus/components': 'HerodotusComponents',
          '@herodotus/core': 'HerodotusCore',
          '@herodotus/form-apis': 'HerodotusFormApis',
          vuedraggable: 'vuedraggable'
        }
      }
    }
  }
});
