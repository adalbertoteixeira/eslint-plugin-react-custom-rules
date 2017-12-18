/**
 * @fileoverview Selectors should only export a default value, not partial exports.
 * @author adalberto teixeira
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/selectors-default-export-only"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2017, sourceType: 'module' } });
ruleTester.run("selectors-default-export-only", rule, {
  valid: [{
    code: "export const customSelector = state => stat.deliverables;",
    filename: "/some/dir/nota-a-selector-file.js",
  }, {
    code: 'export default { list: selectList };',
    filename: "/some/dir/selectors.js",
  }, {
    code: `
      import crudSelectors from '@store/utils/selectors/crudSelectors';
      export default { list: selectList };
    `,
    filename: "/some/dir/selectors.js",
  }],

  invalid: [{
    code: "export const customSelector = state => stat.deliverables;",
    filename: "/some/dir/selectors.js",
    errors: [{
      message: "`selectors` file should only have a default export.",
      type: "ExportNamedDeclaration"
    }]
  }, {
    code: `
      export const customSelector = state => stat.deliverables;
      export default { list: selectList };
    `,
    filename: "/some/dir/selectors.js",
    errors: [{
      message: "`selectors` file should only have a default export.",
      type: "ExportNamedDeclaration"
    }]
  }]
});
