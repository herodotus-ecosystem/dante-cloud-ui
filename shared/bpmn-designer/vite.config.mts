import { fileURLToPath, URL } from 'node:url';
import { transformAssetUrls } from '@quasar/vite-plugin';
import vue from '@vitejs/plugin-vue';
import { QuasarResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    Components({
      dts: true,
      resolvers: [QuasarResolver()],
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or 'modern'
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('./types', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: '@herodotus/bpmn-designer',
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
        'quasar',
        '@bpmn-io/properties-panel',
        '@herodotus/core',
        '@herodotus/components',
        '@herodotus/bpmn-apis',

        'ids',

        'bpmn-js',
        'bpmn-js/lib/Modeler',
        'bpmn-js/lib/Viewer',
        'bpmn-js-properties-panel',
        'bpmn-js-token-simulation',
        'camunda-bpmn-moddle',
        'camunda-bpmn-moddle/resources/camunda',
        'vue',
        '@bpmn-io/properties-panel',
      ],
      output: {
        exports: 'named',
        assetFileNames: `assets/[ext]/[name][extname]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          quasar: 'quasar',
          '@herodotus/core': 'HerodotusCore',
          '@herodotus/components': 'HerodotusComponents',
          '@herodotus/bpmn-apis': 'HerodotusBpmnApis',

          ids: 'Ids',

          'bpmn-js': 'BpmnJs',
          'bpmn-js/lib/Modeler': 'BpmnJsLibModeler',
          'bpmn-js/lib/Viewer': 'BpmnJsLibViewer',
          'bpmn-js-properties-panel': 'BpmnJsPropertiesPanel',
          'bpmn-js-token-simulation': 'BpmnJsTokenSimulation',
          'camunda-bpmn-moddle': 'CamundaBpmnModdle',
          'camunda-bpmn-moddle/resources/camunda': 'CamundaBpmnModdleResourcesCamunda',
          vue: 'vue',
          '@bpmn-io/properties-panel': 'BpmnIoPropertiesPanel',
        },
      },
    },
  },
});
