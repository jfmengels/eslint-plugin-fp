'use strict';

module.exports = function (context) {
  return {
    ThisExpression(node) {
      context.report({
        node,
        message: 'Unallowed use of `this`'
      });
    }
  };
};
