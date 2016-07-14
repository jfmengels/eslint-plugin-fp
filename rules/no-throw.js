'use strict';

const create = function (context) {
  return {
    ThrowStatement(node) {
      context.report({
        node,
        message: 'Unallowed use of `throw`'
      });
    }
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of `throw`.',
      recommended: 'error'
    }
  }
};
