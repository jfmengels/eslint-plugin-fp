'use strict';

module.exports = function (context) {
  return {
    VariableDeclaration: function (node) {
      if (node.kind === 'let') {
        context.report({
          node: node,
          message: 'Unallowed use of `let`. Use `const` instead'
        });
      }
    }
  };
};
