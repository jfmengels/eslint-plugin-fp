'use strict';

const create = function (context) {
  return {
    VariableDeclaration(node) {
      if (node.kind === 'let') {
        context.report({
          node,
          message: 'Unallowed use of `let`. Use `const` instead'
        });
      }
    }
  };
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of `let`.',
      recommended: 'error',
      url: 'https://github.com/jfmengels/eslint-plugin-fp/tree/master/docs/rules/no-let.md'
    }
  }
};
