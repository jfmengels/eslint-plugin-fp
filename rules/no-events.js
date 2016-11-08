'use strict';

const astUtils = require('eslint-ast-utils');

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
      if (astUtils.isStaticRequire(node) && node.arguments[0].value === 'events') {
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
