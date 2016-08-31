'use strict';

function isValueOfProperty(node) {
  return (node.key.type === 'Identifier' && node.key.name === 'valueOf') ||
    (node.key.type === 'Literal' && node.key.value === 'valueOf');
}

function report(context, node) {
  context.report({
    node,
    message: 'Unallowed use of `valueOf` field'
  });
}

const create = function (context) {
  return {
    Property(node) {
      if (isValueOfProperty(node)) {
        report(context, node);
      }
    },
    AssignmentExpression(node) {
      if (node.left.type === 'MemberExpression' &&
        node.left.property.type === 'Identifier' &&
        node.left.property.name === 'valueOf'
      ) {
        report(context, node.left.property);
      }
    }
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the creation of `valueOf` fields.',
      recommended: 'error'
    }
  }
};
