'use strict';

const create = function (context) {
  return {
    ClassDeclaration(node) {
      context.report({
        node,
        message: 'Unallowed use of `class`. Use functions instead'
      });
    }
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of `class`.',
      recommended: 'error'
    }
  }
};
