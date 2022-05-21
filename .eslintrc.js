module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/essential',
        'plugin:@typescript-eslint/recommended',
        '@vue/prettier',
        '@vue/typescript/recommended',
        '@vue/eslint-config-typescript',
    ],
    plugins: ['vue', '@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prettier/prettier': ['off', { quotes: 0 }],
        'no-undef': 'off',
        //不能有声明后未被使用的变量或参数
        'no-unused-vars': ['off', { vars: 'all', args: 'after-used' }],
        'vue/no-unused-vars': ['off', { vars: 'all', args: 'after-used' }],
        '@typescript-eslint/no-var-requires': ['off'],
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-empty-interface': ['off'],
        '@typescript-eslint/no-this-alias': ['off'],
    },
    settings: {
        'import/resolver': {
            'babel-module': {},
        },
    },
};
