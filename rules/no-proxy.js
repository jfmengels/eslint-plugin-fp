'use strict';

module.exports = function (context) {
  return {
    Identifier: function (node) {
      if (node.name === 'Proxy') {
        context.report({
          node: node,
          message: 'Unallowed use of `Proxy`'
        });
      }
    }
  };
};
