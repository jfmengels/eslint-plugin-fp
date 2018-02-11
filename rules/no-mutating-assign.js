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

const isObjectCreateNull = _.matches({
  type: 'CallExpression',
  callee: {
    type: 'MemberExpression',
    object: {
      type: 'Identifier',
      name: 'Object'
    },
    property: {
      type: 'Identifier',
      name: 'create'
    }
  },
  arguments: [{
    type: 'Literal',
    value: null
  }]
});

const isFunctionExpression = _.flow(
  _.property('type'),
  _.includes(_, ['FunctionExpression', 'ArrowFunctionExpression'])
);

function isAllowedFirstArgument(arg) {
  return isObjectExpression(arg) || isObjectCreateNull(arg) || isFunctionExpression(arg);
}

const create = function (context) {
  return {
    CallExpression(node) {
      if (isObjectAssign(node.callee) && !isAllowedFirstArgument(node.arguments[0])) {
        context.report({
          node,
          message: 'Unallowed use of mutating `Object.assign`'
        });
      }
    }
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) with a variable as first argument.',
      recommended: 'error',
      url: 'https://github.com/jfmengels/eslint-plugin-fp/tree/master/docs/rules/no-mutating-assign.md'
    }
  }
};
