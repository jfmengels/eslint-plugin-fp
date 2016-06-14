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
      "fp/no-let": "error"
		}
	}
}
```


## Rules

- [no-let](docs/rules/no-let.md) - Forbid the use of `let`.

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
