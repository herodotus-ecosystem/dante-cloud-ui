const alias = require('@rollup/plugin-alias');
// babel插件用于处理es6代码的转换，使转换出来的代码可以用于不支持es6的环境使用
const babel = require('@rollup/plugin-babel').babel;
const buble = require('@rollup/plugin-buble');
// 解决rollup.js无法识别CommonJS模块
const commonjs = require('@rollup/plugin-commonjs');
const filesize = require('rollup-plugin-filesize');
// 可以处理组件中import图片的方式，将图片转换成base64格式，但会增加打包体积，适用于小图标
const image = require('@rollup/plugin-image');
const json = require('@rollup/plugin-json');
const multi = require('@rollup/plugin-multi-entry');
// resolve将我们编写的源码与依赖的第三方库进行合并
const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve;
const progress = require('rollup-plugin-progress');
const sizes = require('rollup-plugin-sizes');
const sourceMaps = require('rollup-plugin-sourcemaps');
const sucrase = require('@rollup/plugin-sucrase');
const strip = require('@rollup/plugin-strip');
// 压缩打包代码（rollup-plugin-uglify弃用因为该插件不能识别es的语法，所以采用terser替代）
const terser = require('rollup-plugin-terser').terser;
const typescript = require('rollup-plugin-typescript2');
const vue = require('rollup-plugin-vue');

// PostCSS plugins
const postcss = require('rollup-plugin-postcss');
const nested = require('postcss-nested');
// 处理css定义的变量
const simpleVars = require('postcss-simple-vars');
// 处理less嵌套样式写法
const cssnano = require('cssnano');
// 可以提前适用最新css特性（postcss-cssnext 已废弃由postcss-preset-env替代）
const postcssPresetEnv = require('postcss-preset-env');
const xml = require('rollup-plugin-xml');

module.exports = {
    alias,
    babel,
    buble,
    commonjs,
    filesize,
    image,
    json,
    multi,
    nodeResolve,
    progress,
    sizes,
    sourceMaps,
    strip,
    sucrase,
    terser,
    typescript,
    vue,
    postcss,
    postcssPresetEnv,
    simpleVars,
    nested,
    cssnano,
    xml,
};
