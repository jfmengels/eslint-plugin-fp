'use strict';

function isStaticRequire(node) {
  return node &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require' &&
    node.arguments.length === 1 &&
    node.arguments[0].type === 'Literal';
}

function report(context, node) {
  context.report({
    node,
    message: 'Unallowed use of `events`'
  });
}

const create = function (context) {
  return {
    ImportDeclaration(node) {
      if (node.source.value === 'events') {
        report(context, node);
      }
    },
    CallExpression(node) {
      if (isStaticRequire(node) && node.arguments[0].value === 'events') {
        report(context, node);
      }
    }
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of the `events` module.',
      recommended: 'error'
    }
  }
};
