import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: './dist/types',
    }),
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
      name: '@herodotus-cloud/core',
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
        'axios',
        'qs',
        'crypto',
        'crypto-js',
        'ts-md5',
        'js-base64',
        'sweetalert2',
        'sm-crypto-v2',
        'generate-avatar',
        'dayjs',
        'dayjs/locale/zh-cn',
        'lodash-es',
        'moment',
        'moment/dist/locale/zh-cn',
        '@vueuse/integrations',
        '@vueuse/integrations/useAxios',
      ],
      output: {
        exports: 'named',
        assetFileNames: `assets/[ext]/[name][extname]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          axios: 'Axios',
          qs: 'Qs',
          'crypto-js': 'CryptoJs',
          'ts-md5': 'TsMd5',
          'js-base64': 'JsBase64',
          'sm-crypto-v2': 'SmCryptoV2',
          sweetalert2: 'Sweetalert2',
          'generate-avatar': 'GenerateAvatar',
          dayjs: 'Dayjs',
          'dayjs/locale/zh-cn': 'DayjsLocaleZhcn',
          'lodash-es': 'LodashEs',
          moment: 'Moment',
          'moment/dist/locale/zh-cn': 'MomentDistLocaleZhcn',
          '@vueuse/integrations': 'VueuseIntegrations',
          '@vueuse/integrations/useAxios': 'VueuseIntegrationsUseAxios',
        },
      },
    },
  },
});
