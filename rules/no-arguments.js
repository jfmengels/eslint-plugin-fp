'use strict';

const create = function (context) {
  return {
    Identifier(node) {
      if (node.name === 'arguments') {
        context.report({
          node,
          message: 'Unallowed use of `arguments`. Use regular function arguments instead'
        });
      }
    }
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of `arguments`.',
      recommended: 'error'
    }
  }
};
