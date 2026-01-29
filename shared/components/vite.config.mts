import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
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
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        resolver: fileURLToPath(new URL('./src/resolver.ts', import.meta.url)),
      },
      name: '@herodotus-cloud/components',
      fileName: (format, entry) =>
        format === 'es' ? `${entry}.${format}.mjs` : `${entry}.${format}.js`,
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
        '@tsparticles/basic',
        '@tsparticles/engine',
        '@tsparticles/interaction-particles-links',
        '@mdi/js',
        '@herodotus-cloud/core',
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
          '@herodotus-cloud/core': 'HerodotusCore',
          'lodash-es': 'LodashEs',
        },
      },
    },
  },
});
