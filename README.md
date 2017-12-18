# eslint-plugin-react-custom-rules

[![view on npm](http://img.shields.io/npm/v/eslint-plugin-react-custom-rules.svg?style=flat)](https://www.npmjs.com/package/eslint-plugin-react-custom-rules)
[![Build Status](https://semaphoreci.com/api/v1/adalbertoteixeira/eslint-plugin-react-custom-rules/branches/master/shields_badge.svg)](https://semaphoreci.com/adalbertoteixeira/eslint-plugin-react-custom-rules)

A collection of rules specific to a custom workflow and pattern.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
  npm i eslint --save-dev
```

or 

```
  yarn add -D eslint
```

Next, install `eslint-plugin-react-custom-rules`:

```
  npm install eslint-plugin-react-custom-rules --save-dev
```

or

```
  yarn add -D eslint-plugin-react-custom-rules
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-react-custom-rules` globally.

## Usage

Add `react-custom-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "react-custom-rules"
  ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "react-custom-rules/rule-name": 2
    }
}
```

## Supported Rules

  - `react-directive-no-value-prop`
  - `selectors-default-export-only`

## Notes

Built with [yeoman eslint generator](https://github.com/eslint/generator-eslint).
