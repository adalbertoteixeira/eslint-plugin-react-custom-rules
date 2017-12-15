# Selectors should only export a default value, not named exports. (selectors-default-export-only)

In our team we decided to only export selectors as a default object instead of exporting several selectors independently.


## Rule Details

This rule aims to make the selector file implementation unifrom across our application.

Examples of **incorrect** code for this rule:

```js
  /**
   * In a file named `selectors.js`.
   */
  export const customSelector = state => stat.deliverables;
  
  /**
   * In a file named `selectors.js`.
   */
  export const customSelector = state => stat.deliverables;
  export default { list: selectList };
```

Examples of **correct** code for this rule:

```js
  /**
   * In a file _not_ named `selectors.js`.
   */
  export const customSelector = state => stat.deliverables;

  /**
   * In a file named `selectors.js`.
   */
  export default { list: selectList };
```
