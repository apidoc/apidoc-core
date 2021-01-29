//https://eslint.org/docs/user-guide/configuring
//https://eslint.org/docs/rules/
module.exports = {
    "env": {
        "browser": false,
        "node": true,
        "mocha": true,
        "es6": false,
        "es2017": false,
        "es2020": false,
        "es2021": false
    },
    "globals": {

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
        "no-unused-vars": [
            "error",
            {
                "varsIgnorePattern": "should|expect"
            }
        ]
    }
};
