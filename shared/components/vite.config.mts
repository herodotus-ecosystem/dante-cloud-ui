import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { transformAssetUrls } from '@quasar/vite-plugin';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { QuasarResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    AutoImport({
      imports: ['vue'],
      resolvers: [QuasarResolver()],
    }),
    Components({
      resolvers: [QuasarResolver()],
    }),
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
      name: '@herodotus/components',
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
        'vue',
        'quasar',
        '@tsparticles/basic',
        '@tsparticles/engine',
        '@tsparticles/interaction-particles-links',
        '@mdi/js',
        '@herodotus/core',
      ],
      output: {
        exports: 'named',
        assetFileNames: `assets/[ext]/[name][extname]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'vue',
          quasar: 'quasar',
          '@tsparticles/basic': 'TsparticlesBasic',
          '@tsparticles/engine': 'TsparticlesEngine',
          '@tsparticles/interaction-particles-links': 'TsparticlesInteractionParticlesLinkss',
          '@mdi/js': 'MdiJs',
          '@herodotus/core': 'HerodotusCore',
        },
      },
    },
  },
});
