'use strict';

module.exports = function (context) {
  return {
    ThrowStatement: function (node) {
      context.report({
        node: node,
        message: 'Unallowed use of `throw`'
      });
    }
  };
};
