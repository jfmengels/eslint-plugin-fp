'use strict';

var _ = require('lodash/fp');

var isModuleExports = _.matches({
  type: 'MemberExpression',
  object: {
    type: 'Identifier',
    name: 'module'
  },
  property: {
    type: 'Identifier',
    name: 'exports'
  }
});

var isExports = _.matches({
  type: 'Identifier', name: 'exports'
});

function isModuleExportsMemberExpression(node) {
  return _.overSome([
    isExports,
    isModuleExports,
    function (node) {
      return node.type === 'MemberExpression' && isModuleExportsMemberExpression(node.object);
    }
  ])(node);
}

var isCommonJsExport = _.flow(
  _.property('left'),
  _.overSome([
    isExports,
    isModuleExports,
    isModuleExportsMemberExpression
  ])
);

function errorMessage(isCommonJs) {
  var baseMessage = 'Unallowed reassignment';
  return baseMessage + (isCommonJs ? '. You may want to activate the `commonjs` option for this rule' : '');
}

function makeException(exception) {
  if (!exception.object && !exception.property) {
    return _.stubFalse;
  }
  var query = {type: 'MemberExpression'};
  if (exception.object) {
    query = _.assign(query, {object: {type: 'Identifier', name: exception.object}});
  }
  if (exception.property) {
    query = _.assign(query, {property: {type: 'Identifier', name: exception.property}});
  }
  return _.matches(query);
}

function isExempted(exceptions, node) {
  if (node.type !== 'MemberExpression') {
    return false;
  }
  var matches = exceptions.some(function (matcher) {
    return matcher(node);
  });
  return matches ||
    (node.object.type === 'MemberExpression' && isExempted(exceptions, node.object));
}

module.exports = function (context) {
  var options = context.options[0] || {};
  var acceptCommonJs = options.commonjs;
  var exceptions = _.map(makeException, options.exceptions);
  return {
    AssignmentExpression: function (node) {
      var isCommonJs = isCommonJsExport(node);
      if ((isCommonJs && acceptCommonJs) || isExempted(exceptions, node.left)) {
        return;
      }
      context.report({
        node: node,
        message: errorMessage(isCommonJs)
      });
    },
    UpdateExpression: function (node) {
      context.report({
        node: node,
        message: 'Unallowed use of `' + node.operator + '` operator'
      });
    }
  };
};

module.exports.schema = [{
  type: 'object',
  properties: {
    commonjs: {
      type: 'boolean'
    },
    exceptions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          object: {
            type: 'string'
          },
          property: {
            type: 'string'
          }
        }
      }
    }
  }
}];
