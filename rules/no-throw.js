'use strict';

module.exports = function (context) {
  return {
    ThrowStatement(node) {
      context.report({
        node,
        message: 'Unallowed use of `throw`'
      });
    }
  };
};
