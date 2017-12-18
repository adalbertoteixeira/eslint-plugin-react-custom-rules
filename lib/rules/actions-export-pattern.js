/**
 * @fileoverview Actions should export creators and types.
 * @author adalberto teixeira
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Actions should export creators and types.",
      category: "Fill me in",
      recommended: false
    },
    fixable: 'code',
    schema: []
  },

  create: function(context) {
    const named = new Map()

        function addNamed(name, node) {
          let nodes = named.get(name)

          if (nodes == null) {
            nodes = new Set()
            named.set(name, nodes)
          }

          nodes.add(node)
    }
    
    const errorReport = (node, missingType) => {
      context.report({
        node,
        loc: {
          line: node.loc.end.line,
          column: node.loc.start.column,
        },
        message: `Actions must export ${missingType}.`,
      });
    }

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------


    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      'ExportDefaultDeclaration': (node) => {
        if (node.declaration == null) return
        if (node.declaration && node.declaration.properties && node.declaration.properties.length) {
          node.declaration.properties.forEach((declaration) => {
            addNamed(declaration.key.name, declaration.key)
          })
        }
      },

      'ExportNamedDeclaration': function (node) {
        if (node.declaration == null) return

        if (node.declaration.id != null) {
          addNamed(node.declaration.id.name, node.declaration)
        }

        if (node.declaration.declarations != null) {
          for (let declaration of node.declaration.declarations) {
            addNamed(declaration.id.name, declaration);
          }
        }
      },

      'ExportAllDeclaration': function (node) {
        if (node.source == null) return;
      },

      'Program:exit': function (node) {
        const filename = context.getFilename();
        if (!/actions\.jsx?$/.test(filename)) return;

        const existingExports = {};
        for (let [name, nodes] of named) {
          
          for (let node of nodes) {
            if (
              ['types', 'creators'].includes(name)
              ||
              !existingExports[name]
            ) {
              existingExports[name] = node;
            }
          }
        }


        let hasTypes = false;
        let hasCreators = false;
        if (Object.keys(existingExports).includes('types')) hasTypes = true;
        if (Object.keys(existingExports).includes('creators')) hasCreators = true;

        if (!hasTypes) errorReport(node, 'types');
        if (!hasCreators) errorReport(node, 'creators');
      },
      
    };
  }
};
