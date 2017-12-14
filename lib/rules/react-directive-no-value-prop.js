/**
 * @fileoverview React directive breaks if a property named "value" is used. We should not use it.
 * @author adalbertoteixeira
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "React directive breaks if a property named \"value\" is used. We should not use it.",
            category: "Fill me in",
            recommended: false
        },
        fixable: 'code',  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
      const get = require('lodash.get');

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        const errorReport = (node, loc) =>
          context.report({
            node,
            loc: {
              line: loc.end.line,
              column: loc.start.column,
            },
            message: '"reactDirective" should not have a "value" property.',
            fix: fixer => fixer.insertTextAfter(
              node,'Replace "value" by a different name'
            ),
          });
        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
          ArrowFunctionExpression: (node) => {
            if (node.parent.type !== `VariableDeclarator`) return;

            const declared = context.getDeclaredVariables(node);
            const isReactDirective = declared && declared.length && declared[0].name;
            if (!isReactDirective) return;

            const scope = context.getScope(node)
            const reactDirectiveDeclaration = scope.variables.find(declaration => declaration.name === 'reactDirective')
            if (!reactDirectiveDeclaration) return;

            const reactDirectiveArguments = reactDirectiveDeclaration
              .scope
              .block
              .body
              .arguments;

            if (reactDirectiveArguments.length) {
              if (reactDirectiveArguments[1].type === 'ArrayExpression') {
                const valueAsProp = reactDirectiveArguments[1].elements.find(prop => prop.value === 'value');
                if (valueAsProp) return errorReport(valueAsProp, valueAsProp.loc)
                return null;
              }

              if (reactDirectiveArguments[1].type === 'Identifier') {
                const declarationName = reactDirectiveArguments[1].name;
                const declarationBody = get(node, 'parent.parent.parent.body');

                if (!declarationBody) return null;
                let declarationFilter

                declarationBody.forEach(body => {
                  const filteredBody = body.declarations.find(declaration => declaration.id.name === declarationName);
                  if (filteredBody) declarationFilter = filteredBody;
                })

                if (!declarationFilter) return;

                const valueAsProp = declarationFilter.init.elements.find(element => element.value === 'value');
                if (valueAsProp) return errorReport(valueAsProp, valueAsProp.loc)
            }
            }

            return null;
          },
        };
    }
};
