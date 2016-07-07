'use strict';

const create = function (context) {
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

module.exports = {
  create,
  meta: {
    docs: {
      recommended: 'error'
    }
  }
};
