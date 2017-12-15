/**
* @fileoverview Selectors should only export a default value, not partial exports.
* @author adalberto teixeira
*/
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Selectors should only export a default value, not name exports.",
      recommended: true,
      },
      fixable: null,
      schema: [
          // fill in your schema
      ]
  },

  create: function(context) {

      // variables should be defined here

      //----------------------------------------------------------------------
      // Helpers
      //----------------------------------------------------------------------

      // any helper functions should go here or else delete this section

      //----------------------------------------------------------------------
      // Public
      //----------------------------------------------------------------------

      return {
        // ArrowFunctionExpression: (node) => {
        //   console.log('DEBUG ArrowFunctionExpression', context.getDeclaredVariables(node))
        // },
        // FunctionExpression: (node) => {
        //   console.log('DEBUG FunctionExpression', context.getDeclaredVariables(node))
        // },
        // FunctionDeclaration: (node) => {
        //   console.log('DEBUG FunctionDeclaration', context.getDeclaredVariables(node))
        // },
        ExportNamedDeclaration: (node) => {
          const filename = context.getFilename(node);
          if (!/selectors\.js$/.test(filename)) return;
          context.report(node, '`selectors` file should only have a default export.');
        },
        // VariableDeclarator: (node) => {
        //   const variables = context.getDeclaredVariables(node)[0]
        //   console.log(`
        //     DEBUG VariableDeclarator`, '\n\n\n',
        //     'variables', variables, '\n\n\n',
        //     'references', variables.references, '\n\n\n',
        //     'defs', variables.defs,
        //   )
        // },
        // VariableDeclaration: (node) => {
        //   const variables = context.getDeclaredVariables(node)[0]
        //   console.log(`
        //     DEBUG VariableDeclaration`, '\n\n\n',
        //     'variables', variables, '\n\n\n',
        //     'references', variables.references, '\n\n\n',
        //     'defs', variables.defs,
        //   )
        // },
      };
  }
};
