'use strict';

module.exports = function (context) {
  return {
    ThisExpression: function (node) {
      context.report({
        node: node,
        message: 'Unallowed use of `this`'
      });
    }
  };
};
