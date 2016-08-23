'use strict';

const mutatingMethods = [
  'copyWithin',
  'pop',
  'push',
  'reverse',
  'shift',
  'sort',
  'splice',
  'unshift',
  'unwatch',
  'watch'
];

const mutatingObjectMethods = [
  'defineProperties',
  'defineProperty',
  'setPrototypeOf'
];

function getNameIfPropertyIsIdentifier(property) {
  return property.type === 'Identifier' &&
    mutatingMethods.indexOf(property.name) !== -1 &&
    property.name;
}

function getNameIfPropertyIsLiteral(property) {
  return property.type === 'Literal' &&
    mutatingMethods.indexOf(property.value) !== -1 &&
    property.value;
}

const create = function (context) {
  const options = context.options[0] || {};
  const allowedObjects = options.allowedObjects || [];

  return {
    CallExpression(node) {
      if (node.callee.type !== 'MemberExpression') {
        return;
      }

      if (node.callee.object.type === 'Identifier' && allowedObjects.indexOf(node.callee.object.name) !== -1) {
        return;
      }

      if (node.callee.object.name === 'Object') {
        if (mutatingObjectMethods.indexOf(node.callee.property.name) !== -1) {
          context.report({
            node,
            message: `The use of method \`Object.${node.callee.property.name}\` is not allowed as it will mutate its arguments`
          });
        }
        return;
      }

      const name = getNameIfPropertyIsIdentifier(node.callee.property) || getNameIfPropertyIsLiteral(node.callee.property);
      if (name) {
        context.report({
          node,
          message: `The use of method \`${name}\` is not allowed as it might be a mutating method`
        });
        return;
      }
    }
  };
};

const schema = [{
  type: 'object',
  properties: {
    allowedObjects: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
}];

module.exports = {
  create,
  schema,
  meta: {
    docs: {
      description: 'Forbid the use of mutating methods.',
      recommended: 'error'
    }
  }
};
