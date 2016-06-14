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

module.exports = function (context) {
  var options = context.options[0] || {};
  var acceptCommonJs = options.commonjs;
  return {
    AssignmentExpression: function (node) {
      var isCommonJs = isCommonJsExport(node);
      if (isCommonJs && acceptCommonJs) {
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
    }
  }
}];
