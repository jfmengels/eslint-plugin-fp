'use strict';

const create = function (context) {
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

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of getters and setters.',
      recommended: 'error'
    }
  }
};
