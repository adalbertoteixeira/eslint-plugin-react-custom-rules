/**
 * @fileoverview React directive breaks if a property named &#34;value&#34; is used. We should not use it.
 * @author adalbertoteixeira
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/react-directive-no-value-prop"),

RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

// var ruleTester = new RuleTester();
const ruleTester = new RuleTester({parserOptions: { ecmaVersion: 2017 }});
ruleTester.run("react-directive-no-value-prop", rule, {

    valid: [
      {
        code: `
          const ReactSelector = reactDirective =>
            reactDirective(Selector, ['prop']);
        `,
      },
      {
        code: `
          const properties = ['prop'];
          const ReactSelector = reactDirective =>
            reactDirective(Selector, properties);
        `,
      },
      {
        code: `
          const properties = ['prop'];
          const array = ['value'];
          const ReactSelector = reactDirective =>
            reactDirective(Selector, properties);
        `,
      },
      {
        code: `
          const properties = ['prop', 'other'];
          const array = ['value'];
          const ReactSelector = reactDirective =>
            reactDirective(value, properties);
        `,
      }
    ],

    invalid: [
      {
        code: `
          const ReactSelector = reactDirective =>
            reactDirective(Selector, ['value']);
          const otherFunction = () => somethingElse(Selector, ['value']);
        `,
        errors: [{
         message: '"reactDirective" should not have a "value" property.',
          type: 'Literal'
        }]
      },
      {
        code: `
          const ReactSelector = reactDirective =>
            reactDirective(Selector, ['value']);
          const otherFunction = () => somethingElse(Selector, [
            'value',
            'test',
            'prop',
          ]);
        `,
        errors: [{
         message: '"reactDirective" should not have a "value" property.',
          type: 'Literal'
        }]
      },
      {
        code: `
          const properties = ['value'];
          const ReactSelector = reactDirective =>
            reactDirective(Selector, properties);
        `,
        errors: [{
         message: '"reactDirective" should not have a "value" property.',
          type: 'Literal'
        }]
      },
      {
        code: `
          const properties = [
            'value',
            'test',
            'prop',
          ];
          const ReactSelector = reactDirective =>
            reactDirective(Selector, properties);
        `,
        errors: [{
         message: '"reactDirective" should not have a "value" property.',
          type: 'Literal'
        }]
      }
    ]
});
