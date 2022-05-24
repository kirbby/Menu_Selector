module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ["es-beautifier"],
    extends: [
        "plugin:vue/vue3-essential",
        "plugin:es-beautifier/standard",
        "@vue/typescript/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
        parser: "@typescript-eslint/parser",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "comma-dangle": ["error", "only-multiline"],
        "linebreak-style": "off",
        "indent": ["error", 4],
        "vue/script-indent": ["error", 4, { "baseIndent": 0 }],
        "vue/html-indent": ["error", 4, { "baseIndent": 0 }],
        "semi": [2, "always"],
        "quotes": [
            2,
            "double",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }],
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: {
                jest: true,
            },
        },
    ],
};
