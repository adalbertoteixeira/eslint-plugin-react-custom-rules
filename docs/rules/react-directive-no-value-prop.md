# React directive breaks if a property named &#34;value&#34; is used. We should not use it. (react-directive-no-value-prop)

The react in angular library does not work well with properties named `value`. It causes all sort os issues when updating the components.

This rule dissalows the usage of a property named `value`.


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
  // No `value` prop in `reactDirective`.
  const ReactSelector = reactDirective =>
    reactDirective(Selector, ['value']);
  const otherFunction = () => somethingElse(Selector, ['value']);

  // No `value` prop in arrays being passed in.
  const properties = ['value'];
  const ReactSelector = reactDirective =>
    reactDirective(Selector, properties);

  const properties = [
    'value',
    'test',
    'prop',
  ];
  const ReactSelector = reactDirective =>
    reactDirective(Selector, properties);

```

Examples of **correct** code for this rule:

```js
  const ReactSelector = reactDirective =>
    reactDirective(Selector, ['prop']);

  const properties = ['prop'];
  const ReactSelector = reactDirective =>
    reactDirective(Selector, properties);

  const properties = ['prop'];
  const array = ['value'];
  const ReactSelector = reactDirective =>
    reactDirective(Selector, properties);

  const properties = ['prop', 'other'];
  const array = ['value'];
  const ReactSelector = reactDirective =>
    reactDirective(value, properties);
`,
  }

```
