# eslint-plugin-react-custom-rules

A collection of rules specific to a custom workflow and pattern.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-react-custom-rules`:

```
$ npm install eslint-plugin-react-custom-rules --save-dev
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

* Fill in provided rules here





