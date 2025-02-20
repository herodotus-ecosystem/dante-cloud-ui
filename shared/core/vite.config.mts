import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('./types', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: '@herodotus/core',
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
        'moment',
        'moment/dist/locale/zh-cn',
        'crypto-js',
        'sweetalert2',
        'sm-crypto',
        'js-base64',
        'generate-avatar',
        'qs',
        'axios',
      ],
      output: {
        exports: 'named',
        assetFileNames: `assets/[ext]/[name][extname]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'lodash-es': 'LodashEs',
          moment: 'Moment',
          'moment/dist/locale/zh-cn': 'MomentDistLocaleZhcn',
          'crypto-js': 'CryptoJs',
          sweetalert2: 'Sweetalert2',
          'sm-crypto': 'SmCrypto',
          'js-base64': 'JsBase64',
          'generate-avatar': 'GenerateAvatar',
          qs: 'Qs',
          axios: 'Axios',
        },
      },
    },
  },
});
