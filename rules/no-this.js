'use strict';

const create = function (context) {
  return {
    ThisExpression(node) {
      context.report({
        node,
        message: 'Unallowed use of `this`'
      });
    }
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of `this`.',
      recommended: 'error'
    }
  }
};
