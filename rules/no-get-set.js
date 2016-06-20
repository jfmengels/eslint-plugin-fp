'use strict';

module.exports = function (context) {
  return {
    Property: function (node) {
      if (node.kind === 'get' || node.kind === 'set') {
        context.report({
          node: node,
          message: 'Unallowed use of `' + node.kind + '`'
        });
      }
    }
  };
};
