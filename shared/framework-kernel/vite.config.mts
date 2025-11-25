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
      entry: [
        fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        fileURLToPath(new URL('./src/static/styles/index.scss', import.meta.url)),
      ],
      name: '@herodotus-cloud/framework-kernel',
      fileName: (format) => (format === 'es' ? `index.${format}.mjs` : `index.${format}.js`),
    },
    // minify: 'terser',
    // terserOptions: {
    //   // 生产环境下移除console
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true,
    //   },
    //   keep_classnames: true,
    // },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'crypto',
        'vue',
        'vue-router',
        'pinia',
        'pinia-plugin-persistedstate',
        'jwt-decode',
        '@herodotus-cloud/core',
      ],
      output: {
        exports: 'named',
        assetFileNames: `assets/[ext]/[name][extname]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          pinia: 'Pinia',
          'pinia-plugin-persistedstate': 'PiniaPluginPersistedstate',
          'jwt-decode': 'JwtDecode',
          '@herodotus-cloud/core': 'HerodotusCore',
        },
      },
    },
  },
});
