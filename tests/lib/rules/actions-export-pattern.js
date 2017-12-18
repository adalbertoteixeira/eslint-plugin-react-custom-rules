/**
 * @fileoverview Actions should export creators and types.
 * @author adalberto teixeira
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/actions-export-pattern"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2017, sourceType: 'module' } });
ruleTester.run("actions-export-pattern", rule, {

  valid: [{
    code: `
      const types = {};
      const creators = {};
      export default { types, creators };
    `,
    filename: 'src/components/Select/actions.js',
  }, {
    code: `
      export const types = {};
      export const creators = {};
    `,
    filename: 'src/components/Select/actions.js',
  }, {
    code: `
      const example = {};
      export default example;
    `,
    filename: 'src/components/Select/other.js',
  }, {
    code: `
      const example = {};
      export const creators = {};
      export default example;
    `,
    filename: 'src/components/Select/other.js',
  }, {
    code: `
      const example = {};
      export const types = {};
      export default example;
    `,
    filename: 'src/components/Select/other.js',
  }],

  invalid: [{
    code: `
      const example = {};
      export default example;
    `,
    filename: 'src/components/Select/actions.js',
    errors: [{
        message: "Actions must export types.",
        type: "Program"
    }, {
      message: "Actions must export creators.",
      type: "Program"
    }]
  }, {
    code: `
      const example = {};
      export const creators = {};
      export default example;
    `,
    filename: 'src/components/Select/actions.js',
    errors: [{
      message: "Actions must export types.",
      type: "Program"
    }]
  }, {
    code: `
      const example = {};
      export const types = {};
      export default example;
    `,
    filename: 'src/components/Select/actions.js',
    errors: [{
      message: "Actions must export creators.",
      type: "Program"
    }]
  }]
});
