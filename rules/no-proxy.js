'use strict';

module.exports = function (context) {
  return {
    Identifier(node) {
      if (node.name === 'Proxy') {
        context.report({
          node,
          message: 'Unallowed use of `Proxy`'
        });
      }
    }
  };
};
