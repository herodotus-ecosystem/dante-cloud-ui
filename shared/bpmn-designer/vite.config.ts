import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { transformAssetUrls } from '@quasar/vite-plugin';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { QuasarResolver } from 'unplugin-vue-components/resolvers';

import path from 'path';
import { includes } from 'lodash-es';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    AutoImport({
      dts: true,
      imports: ['vue', 'quasar']
    }),
    Components({
      dts: true,
      resolvers: [QuasarResolver()]
    }),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      insertTypesEntry: true
    })
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
      name: '@herodotus/bpmn-designer',
      fileName: format => `index.${format}.js`
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
        '@bpmn-io/properties-panel',
        '@herodotus/utils',
        'bpmn-js',
        'bpmn-js-properties-panel',
        'bpmn-js-token-simulation',
        'camunda-bpmn-js-behaviors',
        'camunda-bpmn-moddle',
        'diagram-js',
        'preact',
        'zeebe-bpmn-moddle'
      ],
      output: {
        assetFileNames: `assets/[name].[ext]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'vue',
          quasar: 'quasar',
          '@herodotus/utils': 'HerodotusUtils',
          '@bpmn-io/properties-panel': 'BpmnIoPropertiesPanel',
          'bpmn-js': 'BpmnJs',
          'bpmn-js-properties-panel': 'BpmnJsPropertiesPanel',
          'bpmn-js-token-simulation': 'BpmnJsTokenSimulation',
          'camunda-bpmn-js-behaviors': 'CamundaBpmnJsBehaviors',
          'camunda-bpmn-moddle': 'CamundaBpmnModdle',
          'diagram-js': 'DiagramJs',
          preact: 'preact',
          'zeebe-bpmn-moddle': 'ZeebeBpmnModdle'
        }
      }
    }
  }
});
