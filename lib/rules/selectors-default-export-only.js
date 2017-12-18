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
        ExportNamedDeclaration: (node) => {
          const filename = context.getFilename(node);
          if (!/selectors\.js$/.test(filename)) return;
          context.report({
            node,
            loc: {
              line: node.loc.end.line,
              column: node.loc.start.column,
            },
            message: '`selectors` file should only have a default export.',
          })
        },
      };
  }
};
