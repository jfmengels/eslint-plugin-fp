'use strict';

const create = function (context) {
  return {
    UnaryExpression(node) {
      if (node.operator === 'delete') {
        context.report({
          node,
          message: 'Unallowed use of `delete`'
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
