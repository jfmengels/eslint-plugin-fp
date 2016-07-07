'use strict';

module.exports = function (context) {
  return {
    VariableDeclaration(node) {
      if (node.kind === 'let') {
        context.report({
          node,
          message: 'Unallowed use of `let`. Use `const` instead'
        });
      }
    }
  };
};
