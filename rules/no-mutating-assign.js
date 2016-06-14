'use strict';

var _ = require('lodash/fp');

var isObjectAssign = _.matches({
  type: 'MemberExpression',
  object: {
    type: 'Identifier',
    name: 'Object'
  },
  property: {
    type: 'Identifier',
    name: 'assign'
  }
});

var isObjectExpression = _.flow(
  _.property('type'),
  _.includes(_, ['ObjectExpression', 'ArrayExpression'])
);

module.exports = function (context) {
  return {
    CallExpression: function (node) {
      if (isObjectAssign(node.callee) && !isObjectExpression(node.arguments[0])) {
        context.report({
          node: node,
          message: 'Unallowed use mutating `Object.assign`'
        });
      }
    }
  };
};
