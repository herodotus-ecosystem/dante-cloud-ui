const { utils, rollups, multi } = require('../../../scripts');

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
    plugins: [multi()],
    globals: {
        moment: 'moment',
        lodash: 'lodash',
        shortid: 'shortid',
        sweetalert2: 'Swal',
        localforage: 'localForage',
        'crypto-js': 'CryptoJS',
        'node-rsa': 'NodeRSA',
        'js-base64': 'JsBase64',
    },
    external: [
        // 不被打包的库，比如在项目中会被引入
        'moment',
        'sweetalert2',
        'shortid',
        'localforage',
        'lodash',
        'crypto-js',
        'node-rsa',
        'js-base64',
    ],
};

const entries = (() => {
    let entries = utils.getEntries(['./src/lib', './src/locales'], /^index\.ts$/);
    entries['main'] = './src/index.ts';

    let result = rollups.establish(entries, configs);
    // console.log('[HRB] final entry : ', result);
    return result;
})();

export default entries;
