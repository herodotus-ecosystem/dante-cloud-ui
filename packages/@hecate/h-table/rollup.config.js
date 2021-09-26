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
    globals: {},
    external: [],
};

const entries = (() => {
    let entries = {};
    entries['main'] = './src/index.ts';

    let result = rollups.establish(entries, configs);
    return result;
})();

export default entries;
