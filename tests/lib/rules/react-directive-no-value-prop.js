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
          const ReactBrandSelector = reactDirective =>
            reactDirective(BrandSelector, ['prop']);
        `,
      },
      {
        code: `
          const properties = ['prop'];
          const ReactBrandSelector = reactDirective =>
            reactDirective(BrandSelector, properties);
        `,
      },
      {
        code: `
          const properties = ['prop'];
          const array = ['value'];
          const ReactBrandSelector = reactDirective =>
            reactDirective(BrandSelector, properties);
        `,
      },
      {
        code: `
          const properties = ['prop'];
          const array = ['value'];
          const ReactBrandSelector = reactDirective =>
            reactDirective(value, properties);
        `,
      }
    ],

    invalid: [
      {
        code: `
          const ReactBrandSelector = reactDirective =>
            reactDirective(BrandSelector, ['value']);
          const otherFunction = () => somethingElse(BrandSelector, ['value']);
        `,
        errors: [{
         message: '"reactDirective" should not have a "value" property.',
          type: 'Literal'
        }]
      },
      {
        code: `
          const ReactBrandSelector = reactDirective =>
            reactDirective(BrandSelector, ['value']);
          const otherFunction = () => somethingElse(BrandSelector, [
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
          const ReactBrandSelector = reactDirective =>
            reactDirective(BrandSelector, properties);
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
          const ReactBrandSelector = reactDirective =>
            reactDirective(BrandSelector, properties);
        `,
        errors: [{
         message: '"reactDirective" should not have a "value" property.',
          type: 'Literal'
        }]
      }
    ]
});
