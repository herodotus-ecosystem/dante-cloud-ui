const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

const IS_PRODUCTION = ['production', 'prod'].includes(process.env.NODE_ENV);
const IS_DEVELOPMENT = ['development', 'dev'].includes(process.env.NODE_ENV);

module.exports = {
    /**
     * Type: string
     * Default: '/'
     *
     * 部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致，但是 Vue CLI 在一些其他地方也需要用到这个值，
     * 所以请始终使用 publicPath 而不要直接修改 webpack 的 output.publicPath。
     *
     * 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。
     * 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
     * 例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
     *
     * 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，
     * 这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中。
     */
    publicPath: '/',

    /**
     * Type: string
     * Default: 'dist'
     *
     * 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
     * 注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
     *
     * 提示
     * 请始终使用 outputDir 而不要修改 webpack 的 output.path
     *
     * 输出到 docker-compose 上下文目录，方便打包部署
     */
    outputDir: '../../../container/context/dist',

    /**
     * Type: string
     * Default: ''
     *
     * 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
     *
     * 提示
     * 从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略。
     */
    assetsDir: 'static',

    /**
     * Type: string
     * Default: 'index.html'
     *
     * 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
     */
    indexPath: 'index.html',

    /**
     * Type: boolean | 'warning' | 'default' | 'error'
     * Default: 'default'
     *
     * 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
     * 设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。
     * 默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
     *
     * 如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'default'。
     * 这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
     *
     * 设置为 error 将会使得 eslint-loader 把 lint 警告也输出为编译错误，这意味着 lint 警告将会导致编译失败。
     * 或者，你也可以通过设置让浏览器 overlay 同时显示警告和错误：
     */
    lintOnSave: true,

    /**
     * Type: boolean
     * Default: false
     *
     * 是否使用包含运行时编译器的 Vue 构建版本。
     * 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
     */
    runtimeCompiler: true,

    /**
     * Type: Array<string | RegExp>
     * Default: []
     *
     * 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
     * 如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
     */
    transpileDependencies: ['vuetify'],

    /**
     * Type: boolean
     * Default: true
     *
     * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
     */
    productionSourceMap: IS_DEVELOPMENT ? true : false,

    chainWebpack: (config) => {
        // 修复HMR
        config.resolve.symlinks(true);
        //添加别名
        config.resolve.alias.set('@/', resolve('src/'));

        if (IS_PRODUCTION) {
            config.plugins.delete('copy');
            config.plugins.delete('preload');

            config.plugins.delete('prefetch');
            // config.plugins.delete('html');
            config.plugins.delete('hmr');
            // config.entryPoints.delete('app');
        }
        config.module // 将xml-loader替换成raw-loader
            .rule('raw-loader')
            .test(/.(bpmn|xml)$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end();
    },

    configureWebpack: (config) => {
        if (process.env.IS_ANALYZE) {
            config.plugins.push(new BundleAnalyzerPlugin());
        }

        if (IS_PRODUCTION) {
            const productionGzipExtensions = ['js', 'css', 'json', 'txt', 'html', 'ico', 'svg'];
            config.plugins.push(
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false, // 删除原文件
                })
            );

            // 开启分离js
            config.optimization = {
                runtimeChunk: 'single',
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 20000,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                // get the name. E.g. node_modules/packageName/not/this/part.js
                                // or node_modules/packageName
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                                // npm package names are URL-safe, but some servers don't like @ symbols
                                return `npm.${packageName.replace('@', '')}`;
                            },
                        },
                    },
                },
            };
        }
    },

    css: {
        /**
         * Type: boolean
         * Default: true
         *
         * 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。
         * 设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
         *
         * 提示
         * 如果你在 css.loaderOptions.css 里配置了自定义的 CSS Module 选项，
         * 则 css.requireModuleExtension 必须被显式地指定为 true 或者 false，
         * 否则我们无法确定你是否希望将这些自定义配置应用到所有 CSS 文件中。
         */
        requireModuleExtension: true,
        /**
         * Type: boolean | Object
         * Default: 生产环境下是 true，开发环境下是 false
         *
         * 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
         * 同样当构建 Web Components 组件时它总是会被禁用 (样式是 inline 的并注入到了 shadowRoot 中)。
         *
         * 当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS。
         * 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。
         * 然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取。
         */
        extract: {
            filename: 'static/css/[name].[hash:8].css', //在lib文件夹中建立style文件夹中，生成对应的css文件。
        },
        /**
         * Type: boolean
         * Default: false
         *
         * 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
         */
        sourceMap: false,
        /**
         * Type: Object
         * Default: {}
         *
         * 向 CSS 相关的 loader 传递选项。例如：
         */
        loaderOptions: {},
    },

    devServer: {
        open: process.platform === 'vue',
        host: '0.0.0.0',
        port: 3000,
        https: false,
        hotOnly: true,
        // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
        proxy: null,
    },

    /**
     * Type: boolean
     * Default: require('os').cpus().length > 1
     *
     * 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
     */
    parallel: require('os').cpus().length > 1,

    // PWA 插件的选项。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli-plugin-pwa/README.md
    pwa: {},

    // 可以用来传递任何第三方插件选项
    pluginOptions: {},
};
