'use strict';

const _ = require('lodash/fp');

const isObjectAssign = _.matches({
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

const isObjectExpression = _.flow(
  _.property('type'),
  _.includes(_, ['ObjectExpression', 'ArrayExpression'])
);

module.exports = function (context) {
  return {
    CallExpression(node) {
      if (isObjectAssign(node.callee) && !isObjectExpression(node.arguments[0])) {
        context.report({
          node,
          message: 'Unallowed use mutating `Object.assign`'
        });
      }
    }
  };
};
