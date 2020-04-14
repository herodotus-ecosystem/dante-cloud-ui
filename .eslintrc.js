module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint",
    },
    // 参数说明：
    // 0或’off’：关闭规则。
    // 1或’warn’：打开规则，并且作为一个警告（并不会导致检查不通过）。
    // 2或’error’：打开规则，并且作为一个错误 (退出码为1，检查不通过)。
    rules: {
        "prettier/prettier": "off",
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        //不能有声明后未被使用的变量或参数
        "no-unused-vars": ["off", { vars: "all", args: "after-used" }],
        "vue/no-unused-vars": ["off", { vars: "all", args: "after-used" }],
    },
};
