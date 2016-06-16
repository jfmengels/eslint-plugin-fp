'use strict';

var _ = require('lodash/fp');

function isComparison(node) {
  return node.parent &&
    node.parent.type === 'BinaryExpression' &&
    _.includes(node.parent.operator, ['==', '!=', '===', '!==']);
}

function reportUseOutsideOfComparison(context, node) {
  if (!isComparison(node)) {
    context.report({
      node: node,
      message: 'Unallowed use of `null` or `undefined`'
    });
  }
}

var endsWithReturnStatement = _.flow(
  _.last,
  _.matches({type: 'ReturnStatement'})
);

function reportFunctions(context, node) {
  if (node.body.type === 'BlockStatement' &&
    !endsWithReturnStatement(node.body.body)
  ) {
    context.report({
      node: node,
      message: 'Function must end with a return statement, so that it doesn\'t return `undefined`'
    });
  }
}

module.exports = function (context) {
  var reportFunc = _.partial(reportFunctions, [context]);
  return {
    Literal: function (node) {
      if (node.value === null) {
        reportUseOutsideOfComparison(context, node);
      }
    },
    Identifier: function (node) {
      if (node.name === 'undefined') {
        reportUseOutsideOfComparison(context, node);
      }
    },
    VariableDeclarator: function (node) {
      if (node.init === null) {
        context.report({
          node: node,
          message: 'Variable must be initialized, so that it doesn\'t evaluate to `undefined`'
        });
      }
    },
    ReturnStatement: function (node) {
      if (node.argument === null) {
        context.report({
          node: node,
          message: 'Return statement must return an explicit value, so that it doesn\'t evaluate to `undefined`'
        });
      }
    },
    ArrowFunctionExpression: reportFunc,
    FunctionDeclaration: reportFunc,
    FunctionExpression: reportFunc
  };
};
