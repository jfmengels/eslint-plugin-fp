'use strict';

const _ = require('lodash/fp');

const isModuleExports = _.matches({
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

const isExports = _.matches({
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

const isCommonJsExport = _.flow(
  _.property('left'),
  _.overSome([
    isExports,
    isModuleExports,
    isModuleExportsMemberExpression
  ])
);

function errorMessage(isCommonJs) {
  const baseMessage = 'Unallowed reassignment';
  return baseMessage + (isCommonJs ? '. You may want to activate the `commonjs` option for this rule' : '');
}

function makeException(exception) {
  if (!exception.object && !exception.property) {
    return _.stubFalse;
  }
  let query = {type: 'MemberExpression'};
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
  const matches = exceptions.some(matcher => matcher(node));
  return matches ||
    (node.object.type === 'MemberExpression' && isExempted(exceptions, node.object));
}

const create = function (context) {
  const options = context.options[0] || {};
  const acceptCommonJs = options.commonjs;
  const exceptions = _.map(makeException, options.exceptions);
  if (options.allowThis) {
    exceptions.push(_.matches({type: 'MemberExpression', object: {type: 'ThisExpression'}}));
  }
  return {
    AssignmentExpression(node) {
      const isCommonJs = isCommonJsExport(node);
      if ((isCommonJs && acceptCommonJs) || isExempted(exceptions, node.left)) {
        return;
      }
      context.report({
        node,
        message: errorMessage(isCommonJs)
      });
    },
    UpdateExpression(node) {
      context.report({
        node,
        message: `Unallowed use of \`${node.operator}\` operator`
      });
    }
  };
};

const schema = [{
  type: 'object',
  properties: {
    commonjs: {
      type: 'boolean'
    },
    allowThis: {
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

module.exports = {
  create,
  meta: {
    schema,
    docs: {
      description: 'Forbid the use of mutating operators.',
      recommended: 'error'
    }
  }
};
