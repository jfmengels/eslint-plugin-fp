'use strict';

module.exports = function (context) {
  return {
    Property(node) {
      if (node.kind === 'get' || node.kind === 'set') {
        context.report({
          node,
          message: `Unallowed use of \`${node.kind}\``
        });
      }
    }
  };
};
