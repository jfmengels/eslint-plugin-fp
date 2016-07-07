'use strict';

module.exports = function (context) {
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
