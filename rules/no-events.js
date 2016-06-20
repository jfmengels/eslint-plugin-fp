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
    node: node,
    message: 'Unallowed use of `events`'
  });
}

module.exports = function (context) {
  return {
    ImportDeclaration: function (node) {
      if (node.source.value === 'events') {
        report(context, node);
      }
    },
    CallExpression: function (node) {
      if (isStaticRequire(node) && node.arguments[0].value === 'events') {
        report(context, node);
      }
    }
  };
};
