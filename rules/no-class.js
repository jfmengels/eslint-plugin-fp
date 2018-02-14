'use strict';

const create = function (context) {
  function report(node) {
    context.report({
      node,
      message: 'Unallowed use of `class`. Use functions instead'
    });
  }

  return {
    ClassDeclaration: report,
    ClassExpression: report
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of `class`.',
      recommended: 'error',
      url: 'https://github.com/jfmengels/eslint-plugin-fp/tree/master/docs/rules/no-class.md'
    }
  }
};
