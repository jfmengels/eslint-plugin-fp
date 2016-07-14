'use strict';

const _ = require('lodash/fp');

function isComparison(node) {
  return node.parent &&
    node.parent.type === 'BinaryExpression' &&
    _.includes(node.parent.operator, ['==', '!=', '===', '!==']);
}

function reportUseOutsideOfComparison(context, node) {
  if (!isComparison(node)) {
    context.report({
      node,
      message: 'Unallowed use of `null` or `undefined`'
    });
  }
}

const endsWithReturnStatement = _.flow(
  _.last,
  _.matches({type: 'ReturnStatement'})
);

function reportFunctions(context, node) {
  if (node.body.type === 'BlockStatement' &&
    !endsWithReturnStatement(node.body.body)
  ) {
    context.report({
      node,
      message: 'Function must end with a return statement, so that it doesn\'t return `undefined`'
    });
  }
}

const create = function (context) {
  const reportFunc = _.partial(reportFunctions, [context]);
  return {
    Literal(node) {
      if (node.value === null) {
        reportUseOutsideOfComparison(context, node);
      }
    },
    Identifier(node) {
      if (node.name === 'undefined') {
        reportUseOutsideOfComparison(context, node);
      }
    },
    VariableDeclarator(node) {
      if (node.init === null) {
        context.report({
          node,
          message: 'Variable must be initialized, so that it doesn\'t evaluate to `undefined`'
        });
      }
    },
    ReturnStatement(node) {
      if (node.argument === null) {
        context.report({
          node,
          message: 'Return statement must return an explicit value, so that it doesn\'t evaluate to `undefined`'
        });
      }
    },
    ArrowFunctionExpression: reportFunc,
    FunctionDeclaration: reportFunc,
    FunctionExpression: reportFunc
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of `null` and `undefined`.',
      recommended: 'error'
    }
  }
};
