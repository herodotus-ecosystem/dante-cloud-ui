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

const DefaultGlobal = {
    vue: 'Vue',
    'vuetify/lib/framework': 'Vuetify',
    '@mdi/js': 'mdi-js',
    '@mdi/font': '@mdi-font',
    'vue-property-decorator': 'vuePropertyDecorator',
    tslib: 'tslib',
};

const DefaultExternal = [
    'vue',
    'vuetify/lib/framework',
    'vuetify',
    '@mdi/js',
    '@mdi/font',
    'vue-property-decorator',
    'vue-class-component',
    'tslib',
    /core-js/,
    /@babel\/runtime/,
    /@babel\/runtime-corejs3/,
    /regenerator-runtime/,
    /vue-runtime-helpers/,
];

const DefaultExtensions = ['.js', '.jsx', '.ts', '.tsx'];

const HelperGlobal = {
    '@babel/runtime-corejs3/core-js/instance/includes': '_includesInstanceProperty',
    '@babel/runtime-corejs3/core-js/instance/keys': '_keysInstanceProperty',
    '@babel/runtime-corejs3/core-js/instance/map': '_mapInstanceProperty',
    '@babel/runtime-corejs3/core-js/json/stringify': '_JSON$stringify',
    '@babel/runtime-corejs3/core-js/object/assign': '_Object$assign',
    '@babel/runtime-corejs3/core-js/object/keys': '_Object$keys',
    '@babel/runtime-corejs3/core-js/promise': '_Promise',
    '@babel/runtime-corejs3/regenerator': '_regeneratorRuntime',
    'vue-runtime-helpers/dist/normalize-component.mjs': '__vue_normalize__',
};

module.exports = { DefaultGlobal, DefaultExternal, DefaultExtensions, HelperGlobal };
