module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "mocha": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};