'use strict';

module.exports = function (context) {
  return {
    ClassDeclaration(node) {
      context.report({
        node,
        message: 'Unallowed use of `class`. Use functions instead'
      });
    }
  };
};
