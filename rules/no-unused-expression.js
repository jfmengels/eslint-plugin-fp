'use strict';

const _ = require('lodash/fp');

const hasSideEffect = _.overSome([
  {type: 'AssignmentExpression'},
  {type: 'UpdateExpression', operator: '++'},
  {type: 'UpdateExpression', operator: '--'},
  {type: 'UnaryExpression', operator: 'delete'}
]);

const create = function (context) {
  return {
    ExpressionStatement(node) {
      if (!hasSideEffect(node.expression)) {
        context.report({
          node,
          message: 'Unused expression'
        });
      }
    },
    SequenceExpression(node) {
      if (!node.parent || node.parent.type !== 'ExpressionStatement') { // Avoid duplicate errors
        context.report({
          node,
          message: 'Unused expression'
        });
      }
    }
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Enforce that an expression gets used.',
      recommended: 'error'
    }
  }
};
