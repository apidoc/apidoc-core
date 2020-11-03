//https://eslint.org/docs/user-guide/configuring
module.exports = {
    "env": {
        "browser": false,
        "node": true,
        "es6": false,
        "es2017": false,
        "es2020": false,
        "es2021": false
    },
    "globals": {
        "require": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-useless-escape": "warn",
        "no-empty": "warn"
    }
};
