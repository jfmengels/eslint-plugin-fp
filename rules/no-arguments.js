'use strict';

function isProperty(node) {
  return Boolean(
    node &&
    node.parent &&
    node.parent.type === 'Property' &&
    node.parent.key === node
  );
}

function isPropertyAccess(node) {
  return Boolean(
    node &&
    node.parent &&
    node.parent.type === 'MemberExpression' &&
    node.parent.property === node
  );
}

const create = function (context) {
  return {
    Identifier(node) {
      if (node.name === 'arguments' && !isProperty(node) && !isPropertyAccess(node)) {
        context.report({
          node,
          message: 'Unallowed use of `arguments`. Use regular function arguments instead'
        });
      }
    }
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of `arguments`.',
      recommended: 'error'
    }
  }
};
