module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        [
            '@babel/preset-env',
            {
                corejs: { version: '3.15.1', proposals: true },
                // 配置"modules": false是因为rollup会处理es6模块语法，其余的es6语法才由babel处理
                modules: false,
                useBuiltIns: 'usage',
                shippedProposals: true,
                targets: '> 0.25%, not dead',
                // Though the "loose" option was set to "false" in your @babel/preset-env config, it will not be used for @babel/plugin-proposal-private-methods since the "loose" mode option was set to "true" for @babel/plugin-proposal-class-properties
                loose: true,
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        // 避免在每个模块的头部重复引用相同的"helpers"方法，只需要在构建完的bundle头部引入一次就够了
        '@babel/plugin-external-helpers',
        // see https://babeljs.io/docs/en/babel-plugin-transform-typescript
        '@babel/plugin-transform-typescript',
        '@babel/plugin-transform-for-of',
        '@babel/plugin-transform-async-to-generator',
        '@babel/plugin-transform-regenerator',
        [
            '@babel/plugin-transform-runtime',
            {
                // 这里的corejs与presets里设置的corejs是不同的，这里的corejs指定了一个runtime-corejs的版本，因此使用时也需要通过 NPM 安装对应的包
                // https://blog.windstone.cc/es6/babel/@babel/plugin-transform-runtime.html#%E4%BD%BF%E7%94%A8-babel-plugin-transform-runtime-%E7%9A%84%E5%8E%9F%E5%9B%A0
                corejs: { version: 3, proposals: true },
                useESModules: true,
            },
        ],
        // see https://babeljs.io/docs/en/babel-plugin-proposal-decorators
        // If you are including your plugins manually and using @babel/plugin-proposal-class-properties, make sure that @babel/plugin-proposal-decorators comes before @babel/plugin-proposal-class-properties.
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    '@/': './src/',
                },
            },
        ],
    ],
};
