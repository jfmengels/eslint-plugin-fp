'use strict';

var _ = require('lodash/fp');

var hasSideEffect = _.overSome([
  {type: 'AssignmentExpression'},
  {type: 'UpdateExpression', operator: '++'},
  {type: 'UpdateExpression', operator: '--'},
  {type: 'UnaryExpression', operator: 'delete'}
]);

module.exports = function (context) {
  return {
    ExpressionStatement: function (node) {
      if (!hasSideEffect(node.expression)) {
        context.report({
          node: node,
          message: 'Unused expression'
        });
      }
    },
    SequenceExpression: function (node) {
      if (!node.parent || node.parent.type !== 'ExpressionStatement') { // Avoid duplicate errors
        context.report({
          node: node,
          message: 'Unused expression'
        });
      }
    }
  };
};
