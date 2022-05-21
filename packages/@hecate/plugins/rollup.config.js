const { rollups } = require('../../../scripts');

/**
 * globals配置写法与import配置写法正好相反
 * 例如：
 * Main.js:
 *
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 *
 * config.js
 *
 * export default {
 *   external: ['react', 'react-dom'],
 *   globals: {
 *     'react': 'React',
 *     'react-dom': 'ReactDOM'
 *   },
 * };
 */
const configs = {
    types: ['umd', 'esm', 'iife'],
    globals: {
        '@hecate/utils': 'utils',
        vuedraggable: 'Draggable',
        'vee-validate': 'VeeValidate',
        'vue-i18n': 'VueI18n',
        'vee-validate/dist/rules': 'Rules',
    },
    external: [
        // 不被打包的库，比如在项目中会被引入
        '@hecate/utils',
        'roboto-fontface',
        'vee-validate',
        'vue-i18n',
        'vuedraggable',
        'vee-validate/dist/rules',
        'roboto-fontface/css/roboto/roboto-fontface.css',
        '@mdi/font/css/materialdesignicons.css',
        'material-design-icons-iconfont/dist/material-design-icons.css',
    ],
};

const entries = (() => {
    let entries = {};
    entries['main'] = './src/index.ts';

    let result = rollups.establish(entries, configs);
    return result;
})();

export default entries;
