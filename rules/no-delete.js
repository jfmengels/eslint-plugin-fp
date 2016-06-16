'use strict';

module.exports = function (context) {
  return {
    UnaryExpression: function (node) {
      if (node.operator === 'delete') {
        context.report({
          node: node,
          message: 'Unallowed use of `delete`'
        });
      }
    }
  };
};
