# eslint-plugin-fp [![Build Status](https://travis-ci.org/jfmengels/eslint-plugin-fp.svg?branch=master)](https://travis-ci.org/jfmengels/eslint-plugin-fp)

ESLint rules for functional programming


## Install

```
$ npm install --save-dev eslint eslint-plugin-fp
```

## Usage

Configure it in `package.json`.

```json
{
  "name": "my-awesome-project",
  "eslintConfig": {
    "env": {
      "es6": true
    },
    "plugins": [
      "fp"
    ],
    "rules": {
      "no-var": "error",
      "fp/no-class": "error",
      "fp/no-delete": "error",
      "fp/no-let": "error",
      "fp/no-loops": "error",
      "fp/no-mutating-assign": "error",
      "fp/no-mutation": "error",
      "fp/no-this": "error",
      "fp/no-throw": "error",
      "fp/no-unused-expression": "error"
    }
  }
}
```


## Rules

- [no-class](docs/rules/no-class.md) - Forbid the use of `class`.
- [no-delete](docs/rules/no-delete.md) - Forbid the use of `delete`.
- [no-let](docs/rules/no-let.md) - Forbid the use of `let`.
- [no-loops](docs/rules/no-loops.md) - Forbid the use of loops.
- [no-mutating-assign](docs/rules/no-mutating-assign.md) - Forbid the use of [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) with a variable as first argument.
- [no-mutation](docs/rules/no-mutation.md) - Forbid the use of mutating operators.
- [no-this](docs/rules/no-this.md) - Forbid the use of `this`.
- [no-throw](docs/rules/no-throw.md) - Forbid the use of `throw`.
- [no-unused-expression](docs/rules/no-unused-expression.md) - Enforce that an expression gets used.

## Recommended configuration

This plugin exports a [`recommended` configuration](index.js) that enforces good practices.

To enable this configuration, use the `extends` property in your `package.json`.

```json
{
  "name": "my-awesome-project",
  "eslintConfig": {
    "plugins": [
      "fp"
    ],
    "extends": "plugin:fp/recommended"
  }
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

MIT © [Jeroen Engels](https://github.com/jfmengels)
